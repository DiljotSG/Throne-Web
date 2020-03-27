import React from 'react';
import {
  Typography, Icon, Select, Button, message,
} from 'antd';
import { PREFERRED_TERM_OPTIONS, PREFERRED_TERM } from '../constants/PersistentSettings';

import { getTerminology } from '../utils/DisplayUtils';

import './Settings.css';

const { Title } = Typography;
const { Option } = Select;

let selectedTerm = getTerminology();

function handlePreferredTermChange(value) {
  selectedTerm = value;
}

function savePreferredTerm() {
  localStorage.setItem(PREFERRED_TERM, selectedTerm);
  message.success(`Preferred Terminology updated to ${selectedTerm}.`);
}

const Settings = () => (
  <>
    <Icon type="setting" className="icon-title" />
    <Title>Settings</Title>
    <Title level={3}>
      Preferred Terminology
    </Title>
    <Select
      style={{ width: 200 }}
      onChange={handlePreferredTermChange}
      placeholder="Preferred Terminology"
      defaultValue={selectedTerm}
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
          ),
        )
        }
    </Select>
    <div>
      <Button
        type="primary"
        className="save-terminology-button"
        onClick={savePreferredTerm}
      >
        Save
      </Button>
    </div>
  </>
);

export default Settings;
