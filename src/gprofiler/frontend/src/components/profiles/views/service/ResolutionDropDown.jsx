

import Select from '@/components/common/selectors/select/Select';
import { ResolutionTimes, ResolutionTimesConvert } from '@/components/profiles/utils';

const ResolutionDropDown = ({ setResolution, resolution, setResolutionValue }) => {
    return (
        <Select
            sx={{ mr: 8 }}
            fullWidth={true}
            placeholder='Resolution'
            selectedOption={resolution}
            disabled={false}
            onSelect={(option) => {
                setResolutionValue(ResolutionTimesConvert[option]);
                setResolution(option);
            }}
            options={ResolutionTimes}
        />
    );
};

export default ResolutionDropDown;
