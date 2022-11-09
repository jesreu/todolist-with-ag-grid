import React, { useState } from'react';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';

function Tab() {

    const [value, setValue] = useState('one');
    const handleChange = (event, value) => {  setValue(value);};

    return (
        <div>
        <Tabs value={value}onChange={handleChange}>
        <Tab value="one"label="Item One" />
        <Tab value="two"label="Item Two" />
        </Tabs>
        {value === 'one' && <div>Item One</div>}
        {value === 'two' && <div>Item Two</div>}
        </div>
    );
}

export default Tab;