import React, { Component } from 'react';
import { Button, Upload } from 'antd';
import PropTypes from 'prop-types';
import { Upload_Attach } from 'ADMIN_SERVICE/Attach';

class Index extends Component {
    //  https://github.com/react-component/upload#customrequest
    customRequest = async ({ onError, onSuccess, data, filename, file }) => {
        //  onError错误回调
        //  onSuccess成功回调
        //  data额外参数
        //  filename文件名称
        //  file文件对象
        const formData = new FormData();
        if (data) {
            Object.keys(data).map(key => {
                formData.append(key, data[key]);
            });
        }

        formData.append(filename, file);

        try {
            const resData = await Upload_Attach(formData);
            const { Code, Data, Info } = resData;
            if (Code) {
                onSuccess(Data, file);
            } else {
                onError(Info);
            }
        } catch (err) {
            onError(err);
        }

        return {
            abort() {
                console.log('upload progress is aborted.');
            }
        };
    }

    render() {
        const { showTitle = '选择文件', showType = 'button' } = this.props;
        return (
            <Upload
                {...this.props}
                customRequest={this.customRequest} >
                {
                    showType == 'button'
                        ? <Button>{showTitle}</Button>
                        : <a href='#' className='w-100'>{showTitle}</a>
                }

            </Upload>
        );
    }
}

Index.propTypes = {
    multiple: PropTypes.bool
};

export default Index;