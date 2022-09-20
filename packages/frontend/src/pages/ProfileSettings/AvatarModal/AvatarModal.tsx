import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, message, Modal, Upload } from 'antd';
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import React, { useEffect, useState } from 'react';
import '../../ProfileDescription/ProfileDescription.css';
import './AvatarModal.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/Redux';
import { fetchUpdateUserAvatar } from '../../../store/actions/UserActions';
import { EStatusLoading } from '../../../models/Api/common';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export const AvatarModal = (props) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const dispatch = useAppDispatch();
    const updateProfileAvatarData = useAppSelector((state) => state.user.requestData?.updateProfileAvatar);

    const { isModalVisible, onChangeVisibilityCallback } = props;

    const [isVisible, setIsVisible] = useState(isModalVisible);

    const handleCancel = () => setPreviewVisible(false);

    useEffect(() => {
        if (updateProfileAvatarData.status === EStatusLoading.ERROR) {
            updateProfileAvatarData.errorMessage && message.error(updateProfileAvatarData.errorMessage, 2);
        } else if (updateProfileAvatarData.status === EStatusLoading.SUCCESS) {
            message.info('Аватар успешно обновлен', 2);
            setIsVisible(false);
        }
    }, [updateProfileAvatarData.status]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewVisible(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    useEffect(() => {
        onChangeVisibilityCallback(isVisible);
    }, [isVisible]);

    useEffect(() => {
        setIsVisible(isModalVisible);
    }, [props]);

    const handelClickSubmit = () => {
        dispatch(fetchUpdateUserAvatar(fileList[0]?.originFileObj));
    };

    return (
        <Modal
            title="Обновление аватара"
            visible={isVisible}
            onCancel={() => setIsVisible(false)}
            destroyOnClose={true}
            footer={null}
            bodyStyle={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '800px !important' }}
        >
            <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                maxCount={1}
                beforeUpload={() => {
                    return false;
                }}
                name="avatar"
            >
                {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            <Modal visible={previewVisible} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
            <Col>
                <Button shape="round" onClick={handelClickSubmit}>
                    Загрузить
                </Button>
            </Col>
        </Modal>
    );
};
