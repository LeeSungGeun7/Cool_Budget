/** @type {import('next').NextConfig} */
const nextConfig = {
    
    env:{
      NEXTAUTH_SECRET:"WABCnWuLX1htQ9nA3LNycvfugzVUdKADzNAv9TG2zo8=",
    } , 
    async headers() {
        return [
            {
                // matching all API routes
                source: "/localhost:3001/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            },
            {
              // imagedelivery.net 도메인 허용
              source: "/k.kakaocdn.net/:path*",
              headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" },
                { key: "Access-Control-Allow-Methods", value: "GET" },
              ]
            }

        ]
    },
    async rewrites() {
        return [
          {
            source: "/hygraph/:path*",
            destination: `https://api-ap-northeast-1.hygraph.com/v2/:path*`,
          },
          {
            source: "/imagedelivery.net/:path*",
            destination : `https://imagedelivery.net/:path*`
          },
          {
            source : "/k.kakaocdn.net/:path*",
            destination: `http://k.kakaocdn.net/:path*`
          }
        ];
      },
      images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**",
          },
          {
            protocol: "http",
            hostname: "**"
          }
        ],
      },    

      reactStrictMode: false,
      
      
};


export default nextConfig;
