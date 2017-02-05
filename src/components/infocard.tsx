import * as React from 'react';

export interface InfoCardProps {
    title: string,
    uri: string,
    iconClass: string
}

export class InfoCard extends React.Component<InfoCardProps, undefined> {
    render() {
        return <div className='col-md-4'>
            <a href={this.props.uri}>
                <i className={this.props.iconClass}></i>
            </a>
            <h2>{this.props.title}</h2>
            {this.props.children}
        </div>
    }
}