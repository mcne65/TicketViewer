import * as React from 'react'
import './styles.css'
import { Container, Grid, TextField, Typography } from '@material-ui/core'
import logo from '../../media/z-logo.svg'

export class Header extends React.Component<any, any> {

    public render() {
        return (
            <div className={'header'}>
                    <img src={logo} />
            </div>
        )
    }

}