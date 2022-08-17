import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import profile08 from "../../../../images/profile/8.jpg";
import profile09 from "../../../../images/profile/9.jpg";

const AppProfilePosts = (props) => {

  const [postModal, setPostModal] = useState(false);
  const [cameraModal, setCameraModal] = useState(false);
  const [linkModal, setLinkModal] = useState(false);
  const [replayModal, setReplayModal] = useState(false);

  return (
    <div className="my-post-content pt-3">
      <div className="post-input">
        <textarea name="textarea" id="textarea" cols={30} rows={5} className="form-control bg-transparent" placeholder="Please type what you want...." defaultValue={""} />
        <Link to="/app-profile" className="btn btn-primary light px-3 me-1" data-toggle="modal" data-target="#linkModal" onClick={() => setLinkModal(true)}>
          <i className="fa fa-link m-0" />{" "}
        </Link>
        {/* Modal */}
        <Modal show={linkModal} onHide={() => setLinkModal(false)} className="modal fade post-input" id="linkModal" aria-hidden="true">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Social Links</h5>
              <button type="button" className="btn-close" data-dismiss="modal" onClick={() => setLinkModal(false)}>
              </button>
            </div>
            <div className="modal-body">
              <Link className="btn-social me-1 facebook" to="/app-profile"><i className="fa fa-facebook" /></Link>
              <Link className="btn-social me-1 google-plus" to="/app-profile"> <i className="fa fa-google-plus" /></Link>
              <Link className="btn-social me-1 linkedin" to="/app-profile"><i className="fa fa-linkedin" /></Link>
              <Link className="btn-social me-1 instagram" to="/app-profile"> <i className="fa fa-instagram" /></Link>
              <Link className="btn-social me-1 twitter" to="/app-profile"><i className="fa fa-twitter" /></Link>
              <Link className="btn-social me-1 youtube" to="/app-profile"><i className="fa fa-youtube" /></Link>
              <Link className="btn-social whatsapp" to="/app-profile"><i className="fa fa-whatsapp" /></Link>
            </div>
          </div>
        </Modal>
        <Link to="/app-profile" className="btn btn-primary light px-3 me-1" data-toggle="modal" data-target="#cameraModal" onClick={() => setCameraModal(true)}>
          <i className="fa fa-camera m-0" />{" "}
        </Link>
        {/* Modal */}
        <Modal show={cameraModal} onHide={() => setCameraModal(false)} className="modal fade" id="cameraModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Upload images</h5>
              <button type="button" className="btn-close" data-dismiss="modal" onClick={() => setCameraModal(false)}>
              </button>
            </div>
            <div className="modal-body">
              <div className="input-group mb-3">
                <span className="input-group-text">Upload</span>
                <div className="form-file">
                  <input type="file" className="form-file-input" />
                </div>
              </div>
            </div>
          </div>
        </Modal>
        <Link to="/app-profile" className="btn btn-primary ms-1" data-toggle="modal" data-target="#postModal" onClick={() => setPostModal(true)}>Post</Link>
        {/* Modal */}
        <Modal show={postModal} onHide={() => setPostModal(false)} className="modal fade" id="postModal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Post</h5>
              <Button variant="" type="button" className="close" data-dismiss="modal" onClick={() => setPostModal(false)} >
                <span>×</span>
              </Button>

            </div>
            <div className="modal-body">
              <textarea name="textarea" id="textarea" cols={30} rows={5} className="form-control mb-2 bg-transparent" placeholder="Please type what you want...." defaultValue={""} />
              <Link className="btn btn-primary btn-rounded mt-1" to="/app-profile">Post</Link>
            </div>
          </div>
        </Modal>
      </div>

      <div className="profile-uoloaded-post border-bottom-1 pb-5">
        <img src={profile08} alt="" className="img-fluid w-100 rounded" />
        <Link className="post-title" to="/post-details">
          <h3 className="text-black">Collection of textile samples lay spread</h3>
        </Link>
        <p>
          A wonderful serenity has take possession of my entire soul like these sweet morning of spare which enjoy whole heart.A wonderful serenity has take
          possession of my entire soul like these sweet morning of spare which enjoy whole heart.
        </p>
        <button className="btn btn-primary me-2">
          <span className="me-2"> <i className="fa fa-heart" /> </span>Like
        </button>
        <button className="btn btn-secondary" onClick={() => setReplayModal(true)}>
          <span className="me-2"> <i className="fa fa-reply" /></span>Reply
        </button>
      </div>
      <div className="profile-uoloaded-post border-bottom-1 pb-5">
        <img src={profile09} alt="" className="img-fluid w-100 rounded" />
        <Link className="post-title" to="/post-details">
          <h3 className="text-black">Collection of textile samples lay spread</h3>
        </Link>
        <p>
          A wonderful serenity has take possession of my
          entire soul like these sweet morning of spare which
          enjoy whole heart.A wonderful serenity has take
          possession of my entire soul like these sweet
          morning of spare which enjoy whole heart.
        </p>
        <button className="btn btn-primary me-2">
          <span className="me-2"> <i className="fa fa-heart" /> </span>Like
        </button>
        <button className="btn btn-secondary" onClick={() => setReplayModal(true)}>
          <span className="me-2">  <i className="fa fa-reply" /></span>Reply
        </button>
      </div>
      <div className="profile-uoloaded-post pb-3">
        <img src={profile08} alt="" className="img-fluid  w-100 rounded" />
        <Link className="post-title" to="/post-details">
          <h3 className="text-black">Collection of textile samples lay spread</h3>
        </Link>
        <p>
          A wonderful serenity has take possession of my
          entire soul like these sweet morning of spare which
          enjoy whole heart.A wonderful serenity has take
          possession of my entire soul like these sweet
          morning of spare which enjoy whole heart.
        </p>
        <button className="btn btn-primary me-2">
          <span className="me-2"><i className="fa fa-heart" /></span>Like
        </button>
        <button className="btn btn-secondary" onClick={() => setReplayModal(true)}>
          <span className="me-2"> <i className="fa fa-reply" /></span>Reply
        </button>
      </div>
      {/* Modal */}
      <Modal show={replayModal} onHide={() => setReplayModal(false)} className="modal fade" id="replyModal">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Post Reply</h5>
            <button type="button" className="btn-close" data-dismiss="modal" onClick={() => setReplayModal(false)}></button>
          </div>
          <div className="modal-body">
            <form>
              <textarea className="form-control" rows="4">Message</textarea>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger light" data-dismiss="modal" onClick={() => setReplayModal(false)}>Close</button>
            <button type="button" className="btn btn-primary">Reply</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AppProfilePosts;
