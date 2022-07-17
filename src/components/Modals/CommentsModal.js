// import { lazy } from "react";
import {
  Modal,
  Button,
  message,
  Comment,
  Tooltip,
  Avatar,
  Form,
  Input,
  Spin,
} from "antd"
import { useEffect, useState, useRef } from "react"
import dynamic from 'next/dynamic'
import moment from "moment"

// api import
import { getComments, putComment } from "src/api/services/maker-checker"

// utils import
import { SERVER_ERROR } from "src/utils/errors"
import { errorMessages, successMessages } from 'src/utils/messages';
const CkTextEditor = dynamic(() => import('./CkEditor'))

const { TextArea } = Input
const CommentsModal = props => {
  const [form] = Form.useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { visible, onCancel, onOk, selectedCampaign } = props;
  const [modalData, setModalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const commentRef = useRef('');
  const reload = () => {
    const fetchComments = async () => {
      if (typeof window.localStorage === "undefined" || visible === false) {
        setLoading(true);
        setModalData(null);
        return
      }
      let payload = {
        identifierId: selectedCampaign.id,
        useCaseName: "CREATE_CAMPAIGN",
        userId: typeof Storage !== "undefined"
          ? localStorage.getItem("ls.emailId").replace(/^"(.*)"$/, "$1")
          : null
      }
      let res = await getComments(payload)
      if (res.statusCode === 200 || res.statusCode === 204) {
        res &&
          res.data &&
          JSON.stringify(res.data) !== JSON.stringify(modalData) &&
          setModalData(res.data)
        res.statusCode === 204 && setModalData(null)
      } else {
        message.error(SERVER_ERROR, 5)
      }
      setLoading(false);
    }
    fetchComments()
  }
  useEffect(() => {
    reload()
  })
  const onFinish = async () => {
    setIsSubmitting(true);
    const comment = commentRef.current;
    if (
      comment === null ||
      (comment === undefined && comment !== "") ||
      comment.length <= 3
    ) {
      message.error(errorMessages.invalidCommentError)
      return
    }
    if (typeof window.localStorage === "undefined") {
      return
    }
    console.log(selectedCampaign);
    let payload = {
      identifierId: selectedCampaign.id,
      campaignName: selectedCampaign.name,
      useCaseName: "CREATE_CAMPAIGN",
      userId: typeof Storage !== "undefined"
        ? localStorage.getItem("ls.emailId").replace(/^"(.*)"$/, "$1")
        : null,
      message: comment
    }
    let res = await putComment(payload)
    if (res.statusCode === 200) {
      message.success(successMessages.commentAdded, 5)
      form.setFieldsValue({ comment: "" });
      setIsSubmitting(false);
      reload()
    } else {
      message.error(res.data.error, 5)
    }

  }
  const onFinishFailed = async values => {
    console.log("values", values)
  }

  useEffect(() => {
    const commentContainer = Array.from(document.querySelectorAll(".comment-container"));
    if (commentContainer.length) {
      commentContainer.forEach(comment => {
        const images = Array.from(comment.querySelectorAll("img"));
        if (images.length) {
          images.forEach(img => {
            img.addEventListener("click", (e) => {
              window.open(e.target.src, '_blank');
            });
          })
        }
      })
    }
  })


  return (
    <div className="comment-modal">
      <Modal title="Comments" visible={visible} onOk={onOk} onCancel={onCancel}
        width="100%"
        wrapClassName="comment-modal-wrap">
        {modalData &&
          modalData.data &&
          modalData.data.comments.map((comment, index) => (
            <Comment
              key={index}
              author={<a>{comment.userId}</a>}
              avatar={<Avatar src="/v2/images/userIcon.png" alt="Han Solo" />}
              content={<div className="comment-container" dangerouslySetInnerHTML={{ __html: comment.message }} />}
              datetime={
                <Tooltip
                  title={moment(comment.date).format("YYYY-MM-DD HH:mm:ss")}
                >
                  <span>{moment(comment.date).fromNow()}</span>
                </Tooltip>
              }
            />
          ))}
        {modalData && (
          <Form
            form={form}
            name="addCommentForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{ marginBottom: 100 }}
          >
            <Form.Item name="comment">

              <CkTextEditor
                onChange={(data) => {
                  commentRef.current = data;
                }}
                value="mm"
              />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary"
                loading={isSubmitting ? true : undefined}>
                Add Comment
              </Button>
            </Form.Item>
          </Form>
        )}
        {loading === true && <div className="center">
          <Spin />
        </div>}
        {loading === false && modalData === null && "No Intent found"}
      </Modal>
    </div>
  )
}

export default CommentsModal
