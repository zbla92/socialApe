import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';

// REDUX
import { connect } from 'react-redux';
import { markNotificationsRead } from '../../redux/actions/userActions';


// MUI 
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

// Icons
import NotificationsIcon from '@material-ui/icons/Notifications';
import FavouriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';


class Notifications extends React.Component{
    state = {
        anchorEl: null
    }
    handleOpen = (e) => {
        this.setState({ anchorEl: e.target });
    }
    handleClose = () => {
        this.setState({ anchorEl: null })
    }
    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications
            .filter(noty => !noty.read)
            .map(noty => noty.notificationId);
            console.log(unreadNotificationsIds)
        this.props.markNotificationsRead(unreadNotificationsIds)
    }

    render(){
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;
        dayjs.extend(relativeTime);

        let notificationsIcon;
        if(notifications && notifications.length > 0){
            notifications.filter(noty => noty.read === false).length > 0
                 ? notificationsIcon = (
                     <Badge badgeContent={notifications.filter(noty => noty.read === false).length}
                            color='secondary'>
                                <NotificationsIcon/>
                            </Badge>
                 ) : (
                     notificationsIcon = <NotificationsIcon/>
                 )
        } else {
            notificationsIcon = <NotificationsIcon/>
        }
        let notificationsMarkup = notifications && notifications.length > 0 ? (
            notifications.map(noty => {
                const verb = noty.type === 'like' ? 'liked' : 'commented on';
                const time = dayjs(noty.createdAt).fromNow();
                const iconColor = noty.read ? 'primary' : "secondary";
                const icon = noty.type === 'like' ? (
                    <FavouriteIcon color={iconColor} style={{ marginRight: 10 }} />
                ) : (
                    <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
                )
                return (
                    <MenuItem key={noty.createdAt} onClick={this.handleClose}>
                        {icon}
                        <Typography
                            component={Link}
                            color="primary"
                            variant="body1"
                            to={`/users/${noty.recipient}/scream/${noty.screamId}`}
                        >
                            {noty.sender} {verb} your scream {time}
                        </Typography>
                    </MenuItem>
                )
            })
        ) : (
            <MenuItem onClick={this.handleClose}>
                You have no notifications yet.
            </MenuItem>
        )
        return (
            <Fragment>
                <Tooltip placement='top' title='Notifications'>
                    <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                        aria-haspopup='true'
                        onClick={this.handleOpen}
                        >
                            {notificationsIcon}
                        </IconButton>
                </Tooltip>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    onEntered={this.onMenuOpened}
                    >
                        {notificationsMarkup}
                    </Menu>
            </Fragment>
            )
    }
}


Notifications.propTypes = {
    markNotificationsRead: PropTypes.func.isRequired,
    notifications: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    notifications: state.user.notifications
})

export default connect(mapStateToProps, { markNotificationsRead })(Notifications)