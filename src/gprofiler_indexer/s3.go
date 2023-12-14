// INTEL CONFIDENTIAL
// Copyright (C) 2023 Intel Corporation
// This software and the related documents are Intel copyrighted materials, and your use of them is governed by the express license under which they were provided to you ("License"). Unless the License provides otherwise, you may not use, modify, copy, publish, distribute, disclose or transmit this software or the related documents without Intel's prior written permission.
// This software and the related documents are provided as is, with no express or implied warranties, other than those that are expressly stated in the License.

package main

import (
	"bytes"
	"compress/gzip"
	"fmt"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	log "github.com/sirupsen/logrus"
	"io"
	"strings"
)

func GetFileFromS3(sess *session.Session, bucketName string, filename string) ([]byte, error) {
	downloader := s3manager.NewDownloader(sess)
	head, err := downloader.S3.HeadObject(&s3.HeadObjectInput{
		Bucket: aws.String(bucketName),
		Key:    aws.String(filename),
	})
	if err != nil {
		return nil, err
	}
	fileLength := *head.ContentLength
	if fileLength > MaxS3FileSize {
		err = fmt.Errorf("file size %s = %d byte(s) > limit %d byte(s)", filename, fileLength, MaxS3FileSize)
		log.Errorf("%v", err)
		return nil, err
	}
	buff := aws.NewWriteAtBuffer(make([]byte, 0, fileLength))
	numBytes, err := downloader.Download(buff,
		&s3.GetObjectInput{
			Bucket: aws.String(bucketName),
			Key:    aws.String(filename),
		})
	if err != nil {
		log.Errorf("unable download file %s, %v", filename, err)
		return nil, err
	}
	log.Debugf("%s downloaded from %s with len %d byte(s)", filename, bucketName, numBytes)
	if strings.HasSuffix(filename, ".gz") {
		gzipReader, err := gzip.NewReader(bytes.NewBuffer(buff.Bytes()))
		if err != nil {
			return nil, err
		}
		data, err := io.ReadAll(gzipReader)
		return data, err
	}
	return buff.Bytes(), nil
}
