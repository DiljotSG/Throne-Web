import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Form,
  Input,
  Card,
  Button,
  Radio,
  InputNumber,
  Select,
  Alert,
} from 'antd';
import { isEmpty } from 'lodash';
import { amenityAsString, amenityAsEmoji } from '../utils/DisplayUtils';
import { AMENITIES } from '../constants/Amenities';

const { TextArea } = Input;
const { Option } = Select;

const layoutLeft = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const layoutRight = {
  labelCol: { sm: 4, md: 6 },
  wrapperCol: { sm: 20, md: 18 },
};


const amenities = [];
for (let i = 0; i < 35; i += 1) {
  amenities.push(
    <Option key={i} value={AMENITIES[i]}>
      {`${amenityAsString(AMENITIES[i])} ${amenityAsEmoji(AMENITIES[i])}`}
    </Option>,
  );
}

const WashroomForm = ({
  washroom,
  onSubmit,
  onGenderChange,
  onFloorChange,
  onStallChange,
  onUrinalChange,
  onCommentChange,
  onAmenityChange,
  submitting,
  errors,
  created,
  attemptedSubmit,
}) => (
  <Card>
    <Form
      layout="horizontal"
    >
      <Row>
        <Col sm={24} md={10}>
          <Form.Item
            {...layoutLeft} // eslint-disable-line react/jsx-props-no-spreading
            label="Gender"
            name="gender"
          >
            <Radio.Group
              buttonStyle="solid"
              onChange={onGenderChange}
              value={washroom.gender}
            >
              <Radio.Button value="all">Inclusive</Radio.Button>
              <Radio.Button value="women">Woman&apos;s</Radio.Button>
              <Radio.Button value="men">Men&apos;s</Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            {...layoutLeft} // eslint-disable-line react/jsx-props-no-spreading
            label="Floor"
            name="floor"
          >
            <InputNumber
              min={0}
              max={10}
              onChange={onFloorChange}
              value={washroom.floor}
            />
          </Form.Item>
          <Form.Item
            {...layoutLeft} // eslint-disable-line react/jsx-props-no-spreading
            label="Stalls"
            name="stall_count"
          >
            <InputNumber
              min={1}
              max={50}
              onChange={onStallChange}
              value={washroom.stall_count}
            />
          </Form.Item>
          {washroom.gender === 'women' ? ''
            : (
              <Form.Item
                {...layoutLeft} // eslint-disable-line react/jsx-props-no-spreading
                label="Urinals"
                name="urinal_count"
              >
                <InputNumber
                  min={0}
                  max={50}
                  onChange={onUrinalChange}
                  value={washroom.urinal_count}
                />
              </Form.Item>
            )}
        </Col>
        <Col sm={24} md={12}>
          <Form.Item
            {...layoutRight} // eslint-disable-line react/jsx-props-no-spreading
            label="Amenities"
            name="amenities"
          >
            <Select
              mode="multiple"
              placeholder="Please select"
              onChange={onAmenityChange}
              value={washroom.amenities}
            >
              {amenities}
            </Select>
          </Form.Item>
          <Form.Item
            {...layoutRight} // eslint-disable-line react/jsx-props-no-spreading
            label="Description"
            name="comment"
            help="E.g. 'Beside the stairwell'"
          >
            <TextArea
              rows={4}
              value={washroom.comment}
              onChange={onCommentChange}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item>
            <Button
              type="primary"
              disabled={!isEmpty(errors) && attemptedSubmit}
              loading={submitting}
              onClick={onSubmit}
            >
              Add Washroom
            </Button>
          </Form.Item>
        </Col>
        <Col span={24}>
          {!isEmpty(errors) && attemptedSubmit && (
          <Alert
            message={errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
            type="error"
            showIcon
            closable={false}
          />
          )}
          {created && (
          <Alert
            message="Added new washroom"
            type="success"
            showIcon
            closable
          />
          )}
        </Col>
      </Row>
    </Form>
  </Card>
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
  onSubmit: PropTypes.func,
  onGenderChange: PropTypes.func,
  onFloorChange: PropTypes.func,
  onStallChange: PropTypes.func,
  onUrinalChange: PropTypes.func,
  onCommentChange: PropTypes.func,
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
  onCommentChange: () => { },
  onAmenityChange: () => { },
  submitting: false,
  errors: [],
  created: false,
  attemptedSubmit: false,
};


export default WashroomForm;
