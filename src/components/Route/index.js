import React from 'react'
import { Switch, Route } from 'react-router-dom';
import SelectedFile from '../SelectedFile/SelectedFile';

const route = (props) => {
    return (
        <Switch>
            <Route
                path="/file/:id"
                render={(routeProps) => (
                    <SelectedFile {...routeProps} {...props} />
                )}
            />
        </Switch>
    )
}

export default route;
