import Amplify from 'aws-amplify'
import config from '~/aws-exports'

config.oauth.redirectSignIn = `${window.location.origin}/auth/login/`
config.oauth.redirectSignOut = `${window.location.origin}/auth/logout`

Amplify.configure(config)
