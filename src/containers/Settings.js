import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Icon, Select, Button } from 'antd';
import { PREFERRED_TERM_OPTIONS, DEFAULT_TERM } from '../constants/PersistentSettings';

import './Settings.css';

const { Title } = Typography;
const { Option } = Select;

// This needs to be made into a component somehow
const Settings = () => (
  <>
    <Icon type="setting" className="icon-title" />
    <Title>Settings</Title>
    <Select
      style={{ width: 200 }}
      onChange={console.log}
      placeholder="Preferred Terminology"
    >
      {
        PREFERRED_TERM_OPTIONS.map(
          (object) => (
                <Option 
                  key={object}
                  value={object}
                >
                  {object}
                </Option>
            )
          )
        }
    </Select>
    <div>
      <Button
        type="primary"
        className="save-terminology-button"
        onClick={(value) => (console.log(value))}
      >
        Save
      </Button>
    </div>
  </>
);

Settings.propTypes = {
  washrooms: PropTypes.instanceOf(String),
};

Settings.defaultProps = {
  terminology: DEFAULT_TERM
};

export default Settings;
