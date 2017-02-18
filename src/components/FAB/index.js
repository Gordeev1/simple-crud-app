import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { blue600 } from 'material-ui/styles/colors';
import { browserHistory } from 'react-router';

export default ({ predicate }) =>
    <FloatingActionButton 
        style={{ position: 'absolute', bottom: '40px', right: '40px' }}
        backgroundColor={blue600}
        onClick={() => browserHistory.push(`${predicate}/create`)}
    >
        <ContentAdd />
    </FloatingActionButton>