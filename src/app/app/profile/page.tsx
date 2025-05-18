"use client";

import { useAuthStore } from "@/stores/authStore";
import { Card, Typography, Avatar, Descriptions } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ProfilePage = () => {
  const { user } = useAuthStore();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-6rem)]">
        <Typography.Text>Aucun utilisateur connecté</Typography.Text>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-2xl mx-auto">
        <div className="flex flex-col items-center mb-8">
          <Avatar size={96} icon={<UserOutlined />} className="mb-4" />
          <Typography.Title level={2} className="m-0">
            {user.name}
          </Typography.Title>
          <Typography.Text type="secondary">{user.email}</Typography.Text>
        </div>

        <Descriptions bordered column={1}>
          <Descriptions.Item label="ID Utilisateur">
            {user.id}
          </Descriptions.Item>
          <Descriptions.Item label="Nom">{user.name}</Descriptions.Item>
          <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
};

export default ProfilePage;
