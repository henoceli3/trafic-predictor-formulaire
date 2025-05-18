"use client";

import { useAuthStore } from "@/stores/authStore";
import { Card, Typography, Avatar } from "antd";
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
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Carte principale avec les informations basiques */}
        <div className="md:col-span-1">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Avatar
                  size={120}
                  icon={<UserOutlined />}
                  className="bg-gradient-to-r from-primary-100 to-primary-200"
                />
                <div className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-green-500 border-2 border-white"></div>
              </div>
              <Typography.Title level={3} className="m-0 text-center">
                {user.name} {user.first_name}
              </Typography.Title>
              <Typography.Text type="secondary" className="text-center mb-4">
                {user.email}
              </Typography.Text>
              <div
                className={`px-4 py-1 rounded-full ${
                  user.active
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {user.active ? "Compte actif" : "Compte inactif"}
              </div>
            </div>
          </Card>
        </div>

        {/* Carte des détails */}
        <div className="md:col-span-2">
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Typography.Title level={4} className="mb-6">
              Informations détaillées
            </Typography.Title>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">ID Utilisateur</div>
                  <div className="font-medium">{user.id}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Nom complet</div>
                  <div className="font-medium">
                    {user.name} {user.first_name}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">{user.email}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-gray-500">Créé le</div>
                  <div className="font-medium">
                    {new Date(user.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(user.createdAt).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">
                    Dernière mise à jour
                  </div>
                  <div className="font-medium">
                    {new Date(user.updatedAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </div>
                  <div className="text-xs text-gray-400">
                    {new Date(user.updatedAt).toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
