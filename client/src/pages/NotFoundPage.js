import React from 'react'
import {withRouter, Link} from 'react-router-dom'
import AuthTemplate from '../components/auth/AuthTemplate'

function NotFoundPage() {
    return (
        <AuthTemplate>
            404 Not Found
        </AuthTemplate>
    )
}

export default withRouter(NotFoundPage)
