import {createBrowserHistory} from "history";
import {useAppDispatch} from "hooks/Redux";
import {dropRequestUserDataState} from "store/actions/UserActions";

export const history = createBrowserHistory();
// Get the current location.
const location = history.location

// Listen for changes to the current location.

export default history