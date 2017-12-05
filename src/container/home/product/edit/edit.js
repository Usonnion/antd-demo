import React, { PureComponent } from 'react';
import { Form, Input, Button, Card, Upload, Icon, Modal, DatePicker } from 'antd';

const FormItem = Form.Item;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
    md: { span: 10 },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 10, offset: 7 },
  },
};

class EditableProduct extends PureComponent {

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  };

  componentDidMount() {
    this.props.form.setFieldsValue({ fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }] })
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  handleCancel = () => this.setState({ previewVisible: false })

  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (! err) {
        console.log(values)
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Card bordered={false}>
        <Form
          onSubmit={(e) => this.handleSubmit(e)}
          hideRequiredMark
          style={{ marginTop: 8 }}
        >
          <FormItem
            {...formItemLayout}
            label="名称"
          >
            {getFieldDecorator('title', {
              rules: [{
                required: true, message: '请输入产品名称',
              }],
            })(
              <Input placeholder="请输入产品名称" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="有效时间"
          >
            {getFieldDecorator('date', {
              rules: [{
                required: false, message: '请输入产品名称',
              }],
            })(
              <RangePicker />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="产品描述"
          >
            {getFieldDecorator('description', {
              rules: [{
                required: true, message: '请输入产品描述',
              }],
            })(
              <TextArea style={{ minHeight: 32 }} placeholder="请输入产品描述" rows={4} />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="产品展示"
          >
            {getFieldDecorator('fileList', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
            })(
              <Upload
                listType="picture-card"
                name="files"
                onPreview={this.handlePreview}
              >
                {this.state.fileList.length >= 9 ? null : uploadButton}
              </Upload>
            )}
          </FormItem>
            <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
            </Modal>
          <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
            <Button type="primary" htmlType="submit" loading={false}>
              保存
            </Button>
            <Button onClick={() => {this.props.history.goBack();}} style={{ marginLeft: 8 }}>取消</Button>
          </FormItem>
        </Form>
      </Card>
    )
  }
}

export default Form.create()(EditableProduct);
