import { observer } from "mobx-react";
import { Button, TextField } from "@material-ui/core";
import * as PropTypes from "prop-types";

const EntityForm = (props) => {
  const state = props.state;
  const { isEditing, model } = state;
  const ignored = ["_id", "__v", "createdAt", "updatedAt"];
  if (!model) return null;
  return (
    <div>
      <Button
        onClick={() => {
          isEditing ? state.cancel() : state.new();
        }}
      >
        {isEditing ? "Cancel" : "New User"}
      </Button>
      {isEditing ? (
        <div>
          {model.fields().map((f) =>
            ignored.includes(f) ? null : (
              <div>
                <TextField
                  key={f}
                  value={model[f].value}
                  error={model[f].error}
                  label={model[f].label}
                  onChange={(e) => {
                    model[f].setValue(e.target.value);
                  }}
                />
              </div>
            )
          )}
          <div>
            <Button
              color="primary"
              onClick={async () => {
                const response = await state.submit();
              }}
            >
              {model.isNew ? "Create" : "Save"}
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
EntityForm.propTypes = {
  state: PropTypes.object,
};
export default observer(EntityForm);
