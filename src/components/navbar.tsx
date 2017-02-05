import * as React from 'react';

interface NavbarLinkProps {
    text: string;
    iconClass: string;
    uri: string;
}

class NavbarLinkListItem extends React.Component<NavbarLinkProps, undefined> {
    render() {
        return <li key={this.getKey()}>
            <a href={this.props.uri}>
                {this.props.text} <i className={this.props.iconClass}></i>
            </a>
        </li>
    }

    private getKey() {
        return this.props.text;
    }
}

interface NavbarLinkListProps {
    id: string;
}

class NavbarLinkList extends React.Component<NavbarLinkListProps, undefined> {

    private _links: Array<NavbarLinkListItem> = [
        new NavbarLinkListItem({
            text: 'Github',
            uri: 'https://github.com/mtgibbs',
            iconClass: 'fa fa-github-square'
        }),
        new NavbarLinkListItem({
            text: 'LinkedIn',
            uri: 'https://www.linkedin.com/in/mtgibbs21',
            iconClass: 'fa fa-linkedin-square'
        }),
        new NavbarLinkListItem({
            text: 'Email',
            uri: 'mailto:matt@mtgibbs.xyz',
            iconClass: 'fa fa-envelope-square'
        }),
    ];

    render() {
        return <div id={this.props.id} className="navbar-collapse collapse">
            <ul className="nav navbar-nav navbar-right">
                {this._links.map(item => { return item.render() })}
            </ul>
        </div>
    }
}

export class NavBar extends React.Component<any, undefined> {
    render() {
        return <nav className="navbar navbar-default navbar-dark">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar">
                        <span className="sr-only"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a href="#" className="navbar-brand">mtgibbs.xyz</a>
                </div>
                <NavbarLinkList id="navbar" />
            </div>
        </nav>
    }
}