import React, { Component } from "react";
import { Button } from "reactstrap";
import { ArrowRightAlt } from "@material-ui/icons";
import { connect } from "react-redux";
import { becomeDriver } from "../../actions/user-profile";
import swal from 'sweetalert';


class BecomeDriverSection extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleOnClick = () => {
    if(this.props.auth.isAuthenticated) {
      this.props.actionBecomeDriver();
    } else {
      swal('You need login to continue', {
        title: "Failed!!?",
        buttons: true,
        icon: "warning"
      }).then(confirmLogin => {
        (confirmLogin) ? window.location.href="http://localhost:3000/login" : swal.close()
      }).catch(err => console.log(err))
    }
  };
  componentDidUpdate() {
    let eProps = Object.getOwnPropertyNames(this.props.errors)
    if(eProps.length > 0) {
      swal({
        text: `${this.props.errors.errors}`,
        icon: "warning",
        buttons: {
          cancel: false,
          confirm: true
        }
      }).then(res => {
        window.location.href = "http://localhost:3000/setting"
      })
    }
  }
  render() {
    return (
      <div
        style={{
          height: "500px",
          backgroundImage: "url('./images/driver.png')",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          opacity: 0.8
        }}
      >
        <p
          className="h1 text-white"
          style={{
            textShadow: "0.2px 0.2px 10px #000000"
          }}
        >
          Get ready to drive with us
        </p>
        <span
          className="h5 text-white my-2"
          style={{
            textShadow: "0.2px 0.2px 10px #000000"
          }}
        >
          Make money whenever you want, wherever you are.
        </span>

        <Button
          color="secondary shadow-lg mt-2"
          style={{ width: "20rem", height: "4rem", fontSize: "2rem" }}
          onClick={this.handleOnClick}
        >
          Join With Us
          <ArrowRightAlt style={{ fontSize: "3rem" }} />
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    errors: state.errors,
    auth: state.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actionBecomeDriver: () => dispatch(becomeDriver()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BecomeDriverSection);
