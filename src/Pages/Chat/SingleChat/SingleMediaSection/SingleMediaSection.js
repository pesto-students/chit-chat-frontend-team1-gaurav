import React from "react";
import smi1 from "../../../../Assets/single-media-i-1.png";
import spm1 from "../../../../Assets/single-pdf-media.png";
import starReveived from "../../../../Assets/star-received.svg";
import starSent from "../../../../Assets/star-sent.svg";
import "./SingleMediaSection.css";
import { useSelector, useDispatch } from "react-redux";

function SingleMediaSection() {
  const state = useSelector((state) => state.SingleChatReducer);
  var { StaredMessages, receiverDetails } = state;

  const getmonth = (month) => {
    switch (month) {
      case 1:
        return "Jan";
      case 2:
        return "Feb";
      case 3:
        return "Mar";
      case 4:
        return "Apr";
      case 5:
        return "May";
      case 6:
        return "Jun";
      case 7:
        return "July";
      case 8:
        return "Aug";
      case 9:
        return "Sep";
      case 10:
        return "Oct";
      case 11:
        return "Nov";
      case 12:
        return "Dec";
      default:
        break;
    }
  };

  return (
    <>
      <div className="single-media-container">
        <div className="single-media-section">
          <div className="single-media-header">
            <div className="single-media-heading">
              <h2>Media</h2> <span>20</span>
            </div>
            <div className="single-media-see">See All</div>
          </div>
          <div className="single-media-content">
            <div className="single-media-file">
              <div className="single-media-file-container">
                <img src={smi1} alt=""></img>
              </div>
            </div>
            <div className="single-media-file">
              <div className="single-media-file-container">
                <img src={smi1} alt=""></img>
              </div>
            </div>

            <div className="single-media-file">
              <div className="single-media-file-container single-media-info">
                18+
              </div>
            </div>
          </div>
        </div>
        <div className="single-files-section">
          <div className="single-media-header fixed">
            <div className="single-media-heading">
              <h2>Files</h2> <span>20</span>
            </div>
            <div className="single-media-see">See All</div>
          </div>

          <div className="single-files-container">
            <div className="single-file-icon">
              <img src={spm1} alt=""></img>
            </div>
            <div className="single-file-details">
              <div className="single-file-name">Cirriculum Vitae.pdf</div>
              <div className="single-file-detail">
                3.7Mb <span>22Jan 2022</span>
              </div>
            </div>
          </div>

          <div className="single-files-container">
            <div className="single-file-icon">
              <img src={spm1} alt=""></img>
            </div>
            <div className="single-file-details">
              <div className="single-file-name">Cirriculum Vitae.pdf</div>
              <div className="single-file-detail">
                3.7Mb <span>22Jan 2022</span>
              </div>
            </div>
          </div>

          <div className="single-files-container">
            <div className="single-file-icon">
              <img src={spm1} alt=""></img>
            </div>
            <div className="single-file-details">
              <div className="single-file-name">Cirriculum Vitae.pdf</div>
              <div className="single-file-detail">
                3.7Mb <span>22Jan 2022</span>
              </div>
            </div>
          </div>

          <div className="single-files-container">
            <div className="single-file-icon">
              <img src={spm1} alt=""></img>
            </div>
            <div className="single-file-details">
              <div className="single-file-name">Cirriculum Vitae.pdf</div>
              <div className="single-file-detail">
                3.7Mb <span>22Jan 2022</span>
              </div>
            </div>
          </div>
          <div className="single-files-container">
            <div className="single-file-icon">
              <img src={spm1} alt=""></img>
            </div>
            <div className="single-file-details">
              <div className="single-file-name">Cirriculum Vitae.pdf</div>
              <div className="single-file-detail">
                3.7Mb <span>22Jan 2022</span>
              </div>
            </div>
          </div>

          {/* <div className='single-files-container'>
                    <div className='single-file-icon'><img src={spm1} alt=''></img></div>
                    <div className='single-file-details'>
                        <div className='single-file-name'>Cirriculum Vitae.pdf</div>
                        <div className='single-file-detail'>3.7Mb <span>22Jan 2022</span></div>
                    </div>
                </div> */}
        </div>
        <div className="single-star-section">
          <div className="single-media-header">
            <div className="single-media-heading">
              <h2>Stared Messages</h2>
            </div>
            <div className="single-media-see">See All</div>
          </div>

          {StaredMessages.slice(0)
            .reverse()
            .map((message) => {
              if (message.receiverid !== receiverDetails.userid) {
                return (
                  <>
                    <div className="single-message width-90">
                      <div className="single-message-content last-reveived-message star-flex">
                        {message.message}
                        <div className="single-star-received-icon">
                          <img src={starReveived} alt=""></img>
                        </div>{" "}
                      </div>
                    </div>
                    <div className="single-time-stamp single-media-star">
                      {new Date(message.timestamp).getDate()}
                      {getmonth(new Date(message.timestamp).getMonth())}{" "}
                      {new Date(message.timestamp).getFullYear()}{" "}
                      <span>{new Date(message.timestamp).getHours()}:{new Date(message.timestamp).getMinutes()}</span>
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <div className="single-message self-sent-star width-90">
                      <div className="single-message-content self last-sent-message star-flex">
                        <div className="single-star-sent-icon">
                          <img src={starSent} alt=""></img>
                        </div>
                        {message.message}
                      </div>
                    </div>
                    <div className="single-time-stamp self-sent-timestamp end">
                    {new Date(message.timestamp).getDate()}
                      {getmonth(new Date(message.timestamp).getMonth())}{" "}
                      {new Date(message.timestamp).getFullYear()}{" "}
                      <span>{new Date(message.timestamp).getHours()}:{new Date(message.timestamp).getMinutes()}</span>
                    </div>
                  </>
                );
              }
            })}
        </div>
      </div>
    </>
  );
}

export default SingleMediaSection;
