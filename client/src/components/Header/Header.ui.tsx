import * as React from 'react'
import './styles.css'
import logo from '../../media/z-logo.svg'

export class Header extends React.Component<any, any> {

    public render() {
        return (
            <div className={'header'}>
                <img src={logo} alt={'z-logo'} />
            </div>
        )
    }

}