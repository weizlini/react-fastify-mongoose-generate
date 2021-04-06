import { observer } from "mobx-react";
import * as PropTypes from "prop-types";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import EntityList from "./EntityList";
import EntityForm from "./EntityForm";
const EntityAdmin = (props) => {
  const { state } = props;
  const { isEditing, model } = state;
  return (
    <div>
      <EntityList {...props} />
      <Dialog
        open={isEditing}
        onClose={() => {
          state.cancel();
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <EntityForm {...props} />
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              state.cancel();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              state.submit();
            }}
            color="primary"
            disabled={model.isPristine}
          >
            {model.isNew ? "Create" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
EntityAdmin.propTypes = {
  state: PropTypes.object,
};
export default observer(EntityAdmin);
