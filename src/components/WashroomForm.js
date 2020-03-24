import React from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Radio,
  InputNumber,
  Select,
  Alert,
} from 'antd';
import { isEmpty } from 'lodash';
import {
  amenityAsString, amenityAsEmoji, genderAsString, genderAsEmoji,
} from '../utils/DisplayUtils';
import { ALL_AMENITIES } from '../constants/WashroomAmenityTypes';
import { GENDERS } from '../constants/WashroomGenderTypes';

const { TextArea } = Input;
const { Option } = Select;

const WashroomForm = ({
  washroom,
  onChange,
  errors,
  attemptedSubmit,
}) => (
  <Form
    layout="horizontal"
    labelCol={{ span: 4 }}
    wrapperCol={{ span: 20 }}
  >
    <Form.Item
      label="Gender"
      name="gender"
    >
      <Radio.Group
        buttonStyle="solid"
        onChange={(event) => onChange('gender', event.target.value)}
        value={washroom.gender}
      >
        {GENDERS.map((gender) => (
          <Radio.Button
            key={gender}
            value={gender}
          >
            {`${genderAsEmoji(gender)} ${genderAsString(gender)}`}
          </Radio.Button>
        ))}
      </Radio.Group>
    </Form.Item>
    <Form.Item
      label="Floor"
      name="floor"
    >
      <InputNumber
        min={0}
        max={10}
        onChange={(value) => onChange('floor', value)}
        value={washroom.floor}
      />
    </Form.Item>
    <Form.Item
      label="Stalls"
      name="stall_count"
    >
      <InputNumber
        min={1}
        max={50}
        onChange={(value) => onChange('stall_count', value)}
        value={washroom.stall_count}
      />
    </Form.Item>
    {
        washroom.gender !== 'women' && (
          <Form.Item
            label="Urinals"
            name="urinal_count"
          >
            <InputNumber
              min={0}
              max={50}
              onChange={(value) => onChange('urinal_count', value)}
              value={washroom.urinal_count}
            />
          </Form.Item>
        )
      }
    <Form.Item
      label="Amenities"
      name="amenities"
    >
      <Select
        mode="multiple"
        placeholder="Please select"
        onChange={(value) => onChange('amenities', value)}
        value={washroom.amenities}
      >
        {ALL_AMENITIES.map((amenity) => (
          <Option key={amenity}>{`${amenityAsString(amenity)} ${amenityAsEmoji(amenity)}`}</Option>
        ))}
      </Select>
    </Form.Item>
    <Form.Item
      label="Description"
      name="comment"
      help="E.g. 'Beside the stairwell'"
    >
      <TextArea
        rows={4}
        value={washroom.comment}
        onChange={(event) => onChange('comment', event.target.value)}
      />
    </Form.Item>
    {
        !isEmpty(errors) && attemptedSubmit && (
          <Alert
            message={errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
            type="error"
            showIcon
            closable={false}
          />
        )
      }
  </Form>
);

WashroomForm.propTypes = {
  washroom: PropTypes.shape({
    comment: PropTypes.string,
    gender: PropTypes.string,
    floor: PropTypes.number,
    urinal_count: PropTypes.number,
    stall_count: PropTypes.number,
    amenities: PropTypes.instanceOf(Array),
  }).isRequired,
  onChange: PropTypes.func,
  errors: PropTypes.arrayOf(PropTypes.string),
  attemptedSubmit: PropTypes.bool,
};

WashroomForm.defaultProps = {
  onChange: () => { },
  errors: [],
  attemptedSubmit: false,
};


export default WashroomForm;
