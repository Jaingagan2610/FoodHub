import { Button } from "@mui/material";

import { ShoppingBag, TrendingUp, Users, Utensils } from "lucide-react";

export default function HomePage() {
    // const router = useRouter();
  return (
    
    //   <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
    //   <div className="container mx-auto px-4 py-20">
    //     <div className="text-center space-y-8">
    //       <div className="space-y-4">
    //         <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light shadow-lg">
    //           <Utensils className="h-10 w-10 text-primary-foreground" />
    //         </div>
    //         <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
    //           Welcome to FoodHub
    //         </h1>
    //         <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
    //           Your complete food ordering platform with role-based access control
    //         </p>
    //       </div>

    //       <div className="flex flex-wrap justify-center gap-4">
    //         <Button 
    //           // size="lg"
    //           className="bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary text-lg px-8"
    //           // onClick={() => router.push('/auth')}
    //         >
    //           Get Started
    //         </Button>
    //         {/* <Button 
    //           size="lg"
    //           variant="outline"
    //           className="text-lg px-8"
    //           onClick={() => navigate('/auth')}
    //         >
    //           Sign In
    //         </Button> */}
    //       </div>

    //       <div className="grid md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">
    //         <div className="space-y-3 p-6 rounded-xl bg-card border hover:shadow-lg transition-shadow">
    //           <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
    //             <ShoppingBag className="h-6 w-6 text-primary" />
    //           </div>
    //           <h3 className="text-xl font-semibold">Easy Ordering</h3>
    //           <p className="text-muted-foreground">
    //             Browse restaurants, add items to cart, and place orders seamlessly
    //           </p>
    //         </div>

    //         <div className="space-y-3 p-6 rounded-xl bg-card border hover:shadow-lg transition-shadow">
    //           <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
    //             <Users className="h-6 w-6 text-secondary" />
    //           </div>
    //           <h3 className="text-xl font-semibold">Role-Based Access</h3>
    //           <p className="text-muted-foreground">
    //             Different permissions for Admins, Managers, and Members
    //           </p>
    //         </div>

    //         <div className="space-y-3 p-6 rounded-xl bg-card border hover:shadow-lg transition-shadow">
    //           <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
    //             <TrendingUp className="h-6 w-6 text-accent" />
    //           </div>
    //           <h3 className="text-xl font-semibold">Order Management</h3>
    //           <p className="text-muted-foreground">
    //             Track orders, cancel when needed, and manage payments
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-blue-50">
      <div className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">

          {/* Header */}
          <div className="space-y-4">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-300 shadow-lg">
              <Utensils className="h-10 w-10 text-white" />
            </div>

            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 via-blue-600 to-red-500 bg-clip-text text-transparent">
              Welcome to FoodHub
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Your complete food ordering platform with role-based access control
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {/* <Button
              size="lg"
              className="bg-gradient-to-r from-red-500 to-red-400 hover:from-red-600 hover:to-red-500 text-lg px-8 text-white"
              onClick={() => router.push("/auth")}
            >
              Get Started
            </Button> */}

            {/* <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-gray-400"
              onClick={() => router.push("/auth")}
            >
              Sign In
            </Button> */}
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 pt-16 max-w-4xl mx-auto">

            {/* Card 1 */}
            <div className="space-y-3 p-6 rounded-xl bg-white border hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <ShoppingBag className="h-6 w-6 text-red-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Easy Ordering</h3>
              <p className="text-gray-600">
                Browse restaurants, add items to cart, and place orders seamlessly.
              </p>
            </div>

            {/* Card 2 */}
            <div className="space-y-3 p-6 rounded-xl bg-white border hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Role-Based Access</h3>
              <p className="text-gray-600">
                Different permissions for Admins, Managers, and Members.
              </p>
            </div>

            {/* Card 3 */}
            <div className="space-y-3 p-6 rounded-xl bg-white border hover:shadow-lg transition-shadow">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Order Management</h3>
              <p className="text-gray-600">
                Track orders, cancel when needed, and manage payments.
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
