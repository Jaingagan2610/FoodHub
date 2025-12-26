module.exports = [
"[project]/src/app/profile/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ProfilePage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/store/useAuth.ts [app-ssr] (ecmascript)");
"use client";
;
;
function ProfilePage() {
    const { user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$store$2f$useAuth$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    if (!user) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        children: "Please login to view profile."
    }, void 0, false, {
        fileName: "[project]/src/app/profile/page.tsx",
        lineNumber: 8,
        columnNumber: 21
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-md",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: "text-2xl font-bold",
                children: "My Profile"
            }, void 0, false, {
                fileName: "[project]/src/app/profile/page.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Name:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/page.tsx",
                                lineNumber: 14,
                                columnNumber: 12
                            }, this),
                            " ",
                            user.name
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/page.tsx",
                        lineNumber: 14,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Email:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/page.tsx",
                                lineNumber: 15,
                                columnNumber: 12
                            }, this),
                            " ",
                            user.email
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/page.tsx",
                        lineNumber: 15,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Role:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/page.tsx",
                                lineNumber: 16,
                                columnNumber: 12
                            }, this),
                            " ",
                            user.role
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/page.tsx",
                        lineNumber: 16,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Country:"
                            }, void 0, false, {
                                fileName: "[project]/src/app/profile/page.tsx",
                                lineNumber: 17,
                                columnNumber: 12
                            }, this),
                            " ",
                            user.country
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/profile/page.tsx",
                        lineNumber: 17,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/profile/page.tsx",
                lineNumber: 13,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/profile/page.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
} // "use client";
 // import { useEffect, useState } from "react";
 // import api from "@/lib/axios";
 // import { User, Mail, BadgeCheck } from "lucide-react";
 // export default function ProfilePage() {
 //   const [user, setUser] = useState<any>(null);
 //   const [loading, setLoading] = useState(true);
 //   const fetchUser = async () => {
 //     try {
 //       const res = await api.get("/profile"); // ✔ Correct API
 //       setUser(res.data);
 //       console.log("hello",res.data)
 //     } catch (err) {
 //       console.error("Failed to fetch profile:", err);
 //     } finally {
 //       setLoading(false);
 //     }
 //   };
 //   // useEffect(() => {
 //   //   fetchUser();
 //   // }, []);
 //   if (loading) return <p className="p-10 text-xl">Loading...</p>;
 //   if (!user)
 //     return (
 //       <p className="p-10 text-xl text-red-600">Unable to load profile.</p>
 //     );
 //   return (
 //     <div className="max-w-3xl mx-auto p-6">
 //       <div className="bg-white shadow-lg p-8 rounded-xl border">
 //         <h1 className="text-4xl font-bold text-black mb-6">
 //           My <span className="text-orange-600">Profile</span>
 //         </h1>
 //         {/* Profile Card */}
 //         <div className="flex items-center gap-6 border rounded-xl p-6 bg-gray-50">
 //           <div className="bg-orange-600 text-white rounded-full p-4">
 //             <User size={40} />
 //           </div>
 //           <div>
 //             <h2 className="text-2xl font-semibold text-black">
 //               {user.name}
 //             </h2>
 //             <div className="flex items-center gap-2 text-gray-700 mt-1">
 //               <Mail size={18} />
 //               <span>{user.email}</span>
 //             </div>
 //             <span className="inline-block mt-3 bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-semibold text-sm">
 //               Role: {user.role}
 //             </span>
 //           </div>
 //         </div>
 //         {/* Details Section */}
 //         <div className="mt-8">
 //           <h3 className="text-2xl font-semibold text-black mb-4">
 //             Account Details
 //           </h3>
 //           <div className="bg-white border rounded-xl p-6 space-y-4">
 //             <div className="flex justify-between text-gray-700">
 //               <span className="font-medium">Name</span>
 //               <span>{user.name}</span>
 //             </div>
 //             <hr />
 //             <div className="flex justify-between text-gray-700">
 //               <span className="font-medium">Email</span>
 //               <span>{user.email}</span>
 //             </div>
 //             <hr />
 //             <div className="flex justify-between text-gray-700">
 //               <span className="font-medium">Role</span>
 //               <span className="text-blue-600 font-semibold flex items-center gap-1">
 //                 <BadgeCheck size={18} /> {user.role}
 //               </span>
 //             </div>
 //             <hr />
 //             <div className="flex justify-between text-gray-700">
 //               <span className="font-medium">Joined</span>
 //               <span>{new Date(user.createdAt).toLocaleDateString()}</span>
 //             </div>
 //           </div>
 //         </div>
 //       </div>
 //     </div>
 //   );
 // }
}),
];

//# sourceMappingURL=src_app_profile_page_tsx_c1d907c4._.js.map