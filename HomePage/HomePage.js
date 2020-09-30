import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../_actions";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  handleDeleteUser(id) {
    return (e) => this.props.deleteUser(id);
  }

  render() {
    const { user, users } = this.props;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h1>Hi {user.firstName}!</h1>
        <p>You're logged in with React!!</p>
        <h3>All registered users Data:</h3>
        {users.loading && <em>Loading users...</em>}
        {users.error && (
          <span className="text-danger">ERROR: {users.error}</span>
        )}
        <div>
          <table className="table bg-light w-100 mx-auto mt-3">
            <thead className="table-danger">
              <tr>
                <th>ID</th>
                <th>firstName</th>
                <th>Lastname</th>
                <th>email</th>
                <th>gender</th>
                <th>DOB</th>
                <th>Action</th>
              </tr>
            </thead>

            {users.items && (
              <tbody>
                {users.items.map((user, index) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td>{user.date}</td>
                    <td>
                      {user.deleting ? (
                        <em> - Deleting...</em>
                      ) : user.deleteError ? (
                        <span className="text-danger">
                          {" "}
                          - ERROR: {user.deleteError}
                        </span>
                      ) : (
                        <span>
                          {" "}
                          -{" "}
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={this.handleDeleteUser(user.id)}
                          >
                            Delete
                          </button>
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>

        <button type="button" className="btn btn-warning">
          <Link to="/login">Logout</Link>
        </button>
      </div>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll,
  deleteUser: userActions.delete,
};

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };
