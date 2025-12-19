// "use client";

// import { useAuth } from "@/store/useAuth";

// export default function ProfilePage() {
//   const { user } = useAuth();

//   if (!user) return <p>Please login to view profile.</p>;

//   return (
//     <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold">My Profile</h2>
//       <div className="mt-4">
//         <p><strong>Name:</strong> {user.name}</p>
//         <p><strong>Email:</strong> {user.email}</p>
//         <p><strong>Role:</strong> {user.role}</p>
//         <p><strong>Country:</strong> {user.country}</p>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { User, Mail, BadgeCheck } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get("/users/profile"); // ✔ Correct API
      setUser(res.data);
      console.log("hello",res.data)
    } catch (err) {
      console.error("Failed to fetch profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <p className="p-10 text-xl">Loading...</p>;

  if (!user)
    return (
      <p className="p-10 text-xl text-red-600">Unable to load profile.</p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white shadow-lg p-8 rounded-xl border">

        <h1 className="text-4xl font-bold text-black mb-6">
          My <span className="text-orange-600">Profile</span>
        </h1>

        {/* Profile Card */}
        <div className="flex items-center gap-6 border rounded-xl p-6 bg-gray-50">
          <div className="bg-orange-600 text-white rounded-full p-4">
            <User size={40} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-black">
              {user.name}
            </h2>

            <div className="flex items-center gap-2 text-gray-700 mt-1">
              <Mail size={18} />
              <span>{user.email}</span>
            </div>

            <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-semibold text-sm">
              Role: {user.role}
            </span>
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-black mb-4">
            Account Details
          </h3>

          <div className="bg-white border rounded-xl p-6 space-y-4">

            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Name</span>
              <span>{user.name}</span>
            </div>

            <hr />

            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Email</span>
              <span>{user.email}</span>
            </div>

            <hr />

            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Role</span>
              <span className="text-blue-600 font-semibold flex items-center gap-1">
                <BadgeCheck size={18} /> {user.role}
              </span>
            </div>

            <hr />

            <div className="flex justify-between text-gray-700">
              <span className="font-medium">Joined</span>
              <span>{new Date(user.createdAt).toLocaleDateString()}</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
