import * as React from 'react'
// import './styles.css'
import { Fab, CardActions, Typography, Button, Card, CardContent, Icon, Tooltip } from '@material-ui/core'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import { ApplicationState } from '../../redux/state/ApplicationState'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions/index'


interface ILoginPageState {
    email: string,
    password: string,
}


interface ILoginPageProps {
    enableErrorPage: () => void
    disableLoginPage: () => void
    updateTicketTable: (content: any) => void
    tickets: any
}

class SingleTicket extends React.Component<ILoginPageProps, ILoginPageState> {

    constructor(props: any) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleOnEmailChange(event: React.SyntheticEvent) {
        let currentTarget = event.currentTarget as HTMLInputElement
        this.setState({
            email: currentTarget.value
        })
    }

    handleOnPasswordChange(event: React.SyntheticEvent) {
        let currentTarget = event.currentTarget as HTMLInputElement
        this.setState({
            password: currentTarget.value
        })
    }

    handleOnSignin(event: React.SyntheticEvent) {
        fetch("http://localhost:5000/")
            .then(res => res.json())
            .then(res => {
                console.log(res)
                if (res.data.error === "Couldn't authenticate you") {
                    this.props.enableErrorPage()
                } else {
                    this.props.disableLoginPage()
                    this.props.updateTicketTable(res.data.requests)
                }
            })

    }

    public render() {

        return (
            <div className={'login-page'}>
                {/* <Container fixed> */}
                <Card>
                    <CardContent>
                        <Typography
                            className={'card-title'}
                            color="textPrimary"
                            gutterBottom align="left"
                            variant="h5"
                        >
                            Ticket Details
                        {true ? 
                        <Tooltip title="Not solvable by me" placement="top">   
                        <Icon style={{color: 'red', marginLeft: '2px'}}>
                            cancel
                        </Icon>
                        </Tooltip>:
                        <Tooltip title="Solvable by me" placement="top">   
                        <Icon style={{color: 'green', marginLeft: '2px'}}>
                            check_circle
                        </Icon>
                        </Tooltip>}
                        </Typography>
                        
                    </CardContent>
                    <CardActions>
                        <Button size="medium"> Back to all tickets </Button>
                    </CardActions>
                </Card>

                {/* </Container> */}
            </div>
        )
    }

}


function mapStateToProps({ isUserValid, tickets }: ApplicationState) {
    return {
        isUserValid,
        tickets
    }
}

function mapDispatchToProps(dispatch: any) {
    return {
        enableErrorPage: () => dispatch(actions.enableErrorPage()),
        updateTicketTable: (content: any) => dispatch(actions.updateTicketTable(content)),
        disableLoginPage: () => dispatch(actions.disableLoginPage()),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SingleTicket)