import React, { Component } from 'react';
import { uploadCommentFile } from "src/api/services/maker-checker";
import { generalErrorHandler } from 'src/utils/errors';
/**
 * 
 */
class TextEditor extends Component {
  componentDidMount() {
    if (typeof window !== 'undefined') {
      this.CKEditor = require('@ckeditor/ckeditor5-react');
      this.ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
      this.setState({ loading: false });
    }
  }

  render() {
    const { value, onChange } = this.props;
    const CKEditor = this.CKEditor
    const ClassicEditor = this.ClassicEditor


    const custom_config = {
      extraPlugins: [MyCustomUploadAdapterPlugin],
      toolbar: {
        items: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'blockQuote',
          'insertTable',
          '|',
          'imageUpload',
          'undo',
          'redo'
        ]
      },
      table: {
        contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
      }
    }

    return (
      CKEditor ?
        <div className="div ck-editor-container">
          <CKEditor
            required
            editor={ClassicEditor}
            config={custom_config}
            data={value}
            placeholder="write  your"
            onChange={(event, editor) => {
              const data = editor.getData()
              onChange(data)
            }}
          />
        </div>
        : <div>Loading...</div>
    )
  }
}
/**
 * 
 * @param {*} editor 
 */

function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader)
  }
}
/**
 * 
 */
class MyUploadAdapter {
  constructor(props) {
    // CKEditor 5's FileLoader instance.
    this.loader = props;
  }

  // Starts the upload process.
  async upload() {
    return new Promise(async (resolve, reject) => {
      await this.sendUploadRequest(resolve, reject);
    });
  }


  async sendUploadRequest(resolve, reject) {

    const data = new FormData();

    this.loader.file.then(async (result) => {
      data.append('file', result);
      const userId = JSON.parse(localStorage.getItem('ls.user')).userName
      const response = await uploadCommentFile(data, userId)
      if (response.statusCode < 400) {
        resolve({ default: response.data.data })
      } else {
        generalErrorHandler(response)
        reject()
      }

    })

  }

}

export default TextEditor
