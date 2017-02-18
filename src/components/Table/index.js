import React from 'react';
import Table from 'material-ui/Table/Table';
import TableHeader from 'material-ui/Table/TableHeader';
import TableRow from 'material-ui/Table/TableRow';
import TableHeaderColumn from 'material-ui/Table/TableHeaderColumn';
import TableBody from 'material-ui/Table/TableBody';
import TableRowColumn from 'material-ui/Table/TableRowColumn';
import ContentCreate from 'material-ui/svg-icons/content/create';
import Delete from 'material-ui/svg-icons/action/delete';
import FlatButton from 'material-ui/FlatButton';

export default ({ fields, data, edit, remove }) => 
    <Table selectable={false}>
        <TableHeader 
            displaySelectAll={false}
            adjustForCheckbox={false}
        >
            <TableRow>
                { fields.map(field => 
                    <TableHeaderColumn key={field.title}>{ field.title }</TableHeaderColumn>
                ) }
                <TableHeaderColumn>Actions</TableHeaderColumn>
            </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
        { data.map(item => 
            <TableRow key={item._id}>
                { fields.map((field, i) => 
                    <TableRowColumn key={field.key + i}>{ item[field.key] }</TableRowColumn>
                ) }
                <TableRowColumn>
                    <FlatButton 
                        icon={<ContentCreate />}
                        onClick={() => edit(item._id)}
                    />
                    <FlatButton 
                        icon={<Delete />}
                        onClick={() => remove(item._id)}
                    />  
                </TableRowColumn>
            </TableRow>
        ) }

        </TableBody>
    </Table>