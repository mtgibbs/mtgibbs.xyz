import * as React from 'react';


export class NavBar extends React.Component<any, undefined> {
    render() {
        return <nav className="navbar navbar-default navbar-dark">
            <div className="container-fluid">
                <div className="">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar"></button>
                    <span className="sr-only"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                </div>

            </div>
        </nav>
    }
}