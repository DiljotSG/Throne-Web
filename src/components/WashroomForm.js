import React from 'react';
import PropTypes from 'prop-types';
import {
    Row,
    Col,
    Form,
    Input,
    List,
    Typography,
    Checkbox,
    Radio,
    InputNumber,
    Select,
} from 'antd';
import { isEmpty } from 'lodash';
import { amenityAsString, amenityAsEmoji } from '../utils/DisplayUtils';
import { AMENITIES, AMENITIES_EMOJIS } from '../constants/Amenities';

const { TextArea } = Input;
const { Option } = Select;
// const { Title } = Typography;

const amenities = [];
for (let i = 0; i < 35; i++) {
    amenities.push(<Option key={i} value={AMENITIES[i]}>
        {amenityAsString(AMENITIES[i]) + ' ' + amenityAsEmoji(AMENITIES[i])}
    </Option>
    );
}

const WashroomForm = (
    washroom,
    onSubmit,
    onGenderChange,
    onFloorChange,
    onStallChange,
    onUrinalChange,
    onDescriptionChange,
    onAmenityChange,
    submitting,
    errors,
    created,
    attemptedSubmit,
) => (
        <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
        >
            <Form.Item label="Gender" name="gender" >
                <Radio.Group
                    buttonStyle="solid"
                    onChange={onGenderChange}
                    value={washroom.gender}
                >
                    <Radio.Button value="all">Inclusive</Radio.Button>
                    <Radio.Button value="woman">Woman's</Radio.Button>
                    <Radio.Button value="men">Men's</Radio.Button>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Floor" name="floor">
                <InputNumber
                    size="large"
                    min={1}
                    max={10}
                    onChange={onFloorChange}
                    value={washroom.floor} />
            </Form.Item>
            <Form.Item label="Number of Stalls" name="stall_count">
                <InputNumber
                    size="large"
                    min={0}
                    max={10}
                    onChange={onStallChange}
                    value={washroom.stall_count} />
            </Form.Item>
            <Form.Item label="Number of Urinals" name="urinal_count">
                <InputNumber
                    size="large"
                    min={0}
                    max={20}
                    onChange={onUrinalChange}
                    value={washroom.urinal_count} />
            </Form.Item>
            <Form.Item
                label="Description"
                name="comment"
                help="Description of the location of the washrooms (E.g. 'Beside the stairwell')"
            >
                <TextArea
                    rows={4}
                    value={washroom.comment}
                    onChange={onDescriptionChange}
                />
            </Form.Item>
            <Form.Item label="Amenities" name="amenities">
                <Select
                    mode="multiple"
                    placeholder="Please select"
                    onChange={onAmenityChange}
                    value={washroom.amenities}
                >
                    {amenities}
                </Select>
            </Form.Item>
        </Form >
    );

WashroomForm.propTypes = {
    washroom: PropTypes.shape({
        comment: PropTypes.string,
        gender: PropTypes.string,
        floor: PropTypes.number,
        overall_rating: PropTypes.number,
        average_ratings: PropTypes.shape({
            smell: PropTypes.number,
            privacy: PropTypes.number,
            cleanliness: PropTypes.number,
            toilet_paper_quality: PropTypes.number,
        }),
        amenities: PropTypes.instanceOf(Array),
        is_favorite: PropTypes.bool,
        building_title: PropTypes.string,
        location: PropTypes.shape({
            latitude: PropTypes.number,
            longitude: PropTypes.number,
        }),
    }).isRequired,
    onSubmit: PropTypes.func,
    onGenderChange: PropTypes.func,
    onFloorChange: PropTypes.func,
    onStallChange: PropTypes.func,
    onUrinalChange: PropTypes.func,
    onDescriptionChange: PropTypes.func,
    onAmenityChange: PropTypes.func,
    submitting: PropTypes.bool,
    errors: PropTypes.arrayOf(PropTypes.string),
    created: PropTypes.bool,
    attemptedSubmit: PropTypes.bool,
};

WashroomForm.defaultProps = {
    onSubmit: () => { },
    onGenderChange: () => { },
    onFloorChange: () => { },
    onStallChange: () => { },
    onUrinalChange: () => { },
    onDescriptionChange: () => { },
    onAmenityChange: () => { },
    submitting: false,
    errors: [],
    created: false,
    attemptedSubmit: false,
};


export default WashroomForm;
