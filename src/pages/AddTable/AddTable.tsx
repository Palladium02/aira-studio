import { useState } from 'react';
import { Plus } from 'akar-icons';
import './AddTable.css';
import useInput from '../../hooks/useInput';

interface Schema {
  [key: string]: {
    type: string;
    unique?: string;
  };
}

interface SchemaProperty {
  type: string;
  unique?: string;
}

const AddTable = (): JSX.Element => {
  let [schema, setSchema] = useState<Schema>({
    _id: {
      type: 'string',
      unique: 'true',
    },
  });

  let [tablename, handleTablenameChange] = useInput('');
  let [propertyName, handlePropertyNameChange] = useInput('');
  let [type, handleTypeChange] = useInput('');
  let [unique, handleUniqueChange] = useInput('');

  const handlePropertyForm = () => {
    let validTypes: string[] = ['string', 'number', 'boolean'];
    if (propertyName === '') return;
    if (type === '') return;
    if (!validTypes.includes(type)) return;
    let property: SchemaProperty = {
      type,
    };
    if (
      unique === '' ||
      unique.toLowerCase() !== 'true' ||
      unique.toLowerCase() !== 'false'
    ) {
      property.unique = 'false';
    } else {
      property.unique = unique;
    }
    setSchema({ ...schema, [propertyName]: property });
  };

  const createTable = async () => {
    if (tablename === '') return;
    let response = await (
      await fetch('/api/db/createTable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schema),
      })
    ).json();
  };

  return (
    <div className="addtable">
      <div className="addtable-sidebar">
        {Object.keys(schema).map((key, index) => {
          let current = schema[key];
          return (
            <SidebarItem
              title={key}
              properties={Object.values(current)}
              key={key}
            />
          );
        })}
      </div>
      <div className="addtable-body">
        <div className="addtable-body-tablename">
          <input
            type="text"
            placeholder="Tablename"
            onChange={handleTablenameChange}
          />
          <span>
            <Plus onClick={createTable} />
          </span>
        </div>
        <form
          action=""
          className="addtable-body-form"
          onSubmit={(event) => {
            event.preventDefault();
            handlePropertyForm();
          }}
        >
          <input
            type="text"
            placeholder="Propertyname"
            onChange={handlePropertyNameChange}
          />
          <input type="text" placeholder="Type" onChange={handleTypeChange} />
          <input
            type="text"
            placeholder="Unique"
            onChange={handleUniqueChange}
          />
          <input type="submit" value="Add Property" />
        </form>
      </div>
    </div>
  );
};

interface SidebarItemProps {
  title: string;
  properties: string[];
}

const SidebarItem = ({ title, properties }: SidebarItemProps): JSX.Element => {
  return (
    <div className="addtable-sidebar-item">
      <div className="property-title">{title}</div>
      <div className="properties">
        <div className="properties-border">
          <div></div>
        </div>
        <ul>
          {properties.map((property, index) => {
            return <li key={property + index}>{property}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

export default AddTable;
