import { observer } from "mobx-react";
import { Button } from "@material-ui/core";
import * as PropTypes from "prop-types";
const EntityList = (props) => {
  const { state } = props;
  const { list, model } = state;
  if (!list || !model) return null;
  const fields = model.fields();
  const ignored = ["_id", "__v", "createdAt", "updatedAt"];
  return (
    <div>
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            state.new();
          }}
        >
          Create New
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            {fields.map((f) =>
              ignored.includes(f) ? null : <th>{model[f].label}</th>
            )}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.length ? (
            list.map((data) => (
              <tr>
                {fields.map((f) =>
                  ignored.includes(f) ? null : <td>{data[f]}</td>
                )}
                <td>
                  <Button
                    onClick={() => {
                      state.edit(data);
                    }}
                  >
                    Edit
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={fields.length + 1}>List is empty</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
EntityList.propTypes = {
  state: PropTypes.object,
};
export default observer(EntityList);
