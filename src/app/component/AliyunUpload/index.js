import React, { Component } from 'react';
import { ImagePicker, Toast } from 'antd-mobile';
import OSS from 'ali-oss';

const { STS } = OSS;

export default class extends Component {
    state = {
        files: [{
            url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
            id: '3',
        }],
        aliyunSTS: null
    }

    //  事件绑定不可用async
    handleFileChange = (file, type, index) => {
        this.getAliyunSTS().then((sts) => {
            if (!sts) {
                Toast.fail('获取阿里云key失败！');
            } else {
                this.setState({
                    aliyunSTS: sts
                });

                const client = new OSS({
                    region: 'oss-cn-shanghai',
                    accessKeyId: sts.AccessKeyId,
                    accessKeySecret: sts.AccessKeySecret,
                    stsToken: sts.SecurityToken,
                    bucket: 'nannongrousong-app-private'
                });

                client.multipartUpload('file_key' + new Date().getTime(), file[1].file, {
                    partSize: file[1].file.size,
                    meta: {
                        year: 2018,
                        month: 8,
                        day: 17
                    }
                }).then((res) => {
                    console.log('upload success', res);
                }).catch((err) => {
                    console.log(err);
                });
            }
        });

    }

    getAliyunSTS = async () => {
        const { aliyunSTS } = this.state;
        let Expiration = aliyunSTS ? aliyunSTS.Expiration : new Date().getTime();
        //  没有 STS 或 STS 过期
        if (aliyunSTS == null || new Date().getTime() > Expiration) {
            let res = await fetch('http://localhost:9999/GetAliSTS');
            res = await res.json();
            if (!res.Code) {
                return null;
            } else {
                return res.Data;
            }
        } else {
            return aliyunSTS;
        }
    }

    render() {
        const { files } = this.state;
        return (
            <ImagePicker
                files={files}
                length={1}
                onChange={this.handleFileChange}
            >
            </ImagePicker>
        );
    }
}