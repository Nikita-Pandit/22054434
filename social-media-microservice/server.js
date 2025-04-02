const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Base URL of the test server API
const BASE_URL = "http://20.244.56.144/evaluation-service"; 


// Middleware
app.use(express.json());
app.use(require("cors")());


// app.get("/users", async (req, res) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/users`, {
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
        
//         const users = response.data;

//         // Sort users by post count (descending) and get the top 5
//         const topUsers = users.sort((a, b) => b.posts.length - a.posts.length).slice(0, 5);

//         res.json(topUsers);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching users", error: error.message });
//     }
// });

app.get("/users", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/users`, {
            headers: {
                "Authorization": `${process.env.TOKEN_TYPE} ${process.env.ACCESS_TOKEN}`,
                "Content-Type": "application/json"
            }
        });

        const users = response.data; // Assuming it's an array of user objects

        // Convert users array to the required format
        const usersFormatted = {};
        users.forEach(user => {
            usersFormatted[user.id] = user.name; // Adjust based on actual API response
        });

        res.json({ users: usersFormatted });
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
});



app.get("/posts", async (req, res) => {
    try {
        const { type } = req.query; // `type` can be 'latest' or 'popular'
        const response = await axios.get(`${BASE_URL}/posts`);
        const posts = response.data;

        let filteredPosts = [];

        if (type === "popular") {
            // Sort by comment count and get top post(s)
            const maxComments = Math.max(...posts.map(post => post.comments.length));
            filteredPosts = posts.filter(post => post.comments.length === maxComments);
        } else if (type === "latest") {
            // Sort by post timestamp (assuming there's a 'createdAt' field) and get latest 5
            filteredPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
        } else {
            return res.status(400).json({ message: "Invalid type parameter. Use 'latest' or 'popular'." });
        }

        res.json(filteredPosts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts", error: error.message });
    }
});

console.log(process.env.ACCESS_TOKEN)
console.log(process.env.TOKEN_TYPE)
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});


// const express = require("express");
// const axios = require("axios");
// require("dotenv").config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Base URL of the test server API
// const BASE_URL = "http://20.244.56.144/evaluation-service";

// // Middleware
// app.use(express.json());
// app.use(require("cors")());

// // Cache variables
// let usersCache = {};
// let postsCache = [];
// let lastUpdated = null;
// const CACHE_TTL = 30000; // 30 seconds

// // Helper function to refresh cache
// const refreshCache = async () => {
//   try {
//     const now = Date.now();
//     if (lastUpdated && now - lastUpdated < CACHE_TTL) {
//       return; // Cache is still fresh
//     }

//     // Fetch users
//     const usersResponse = await axios.get(`${BASE_URL}/users`, {
//       headers: {
//         "Authorization": `${process.env.TOKEN_TYPE} ${process.env.ACCESS_TOKEN}`,
//         "Content-Type": "application/json"
//       }
//     });

//     // Format users data
//     usersCache = {};
//     usersResponse.data.forEach(user => {
//       usersCache[user.id] = user.name;
//     });

//     // Fetch posts
//     const postsResponse = await axios.get(`${BASE_URL}/posts`, {
//       headers: {
//         "Authorization": `${process.env.TOKEN_TYPE} ${process.env.ACCESS_TOKEN}`,
//         "Content-Type": "application/json"
//       }
//     });
//     postsCache = postsResponse.data;

//     lastUpdated = now;
//   } catch (error) {
//     console.error("Cache refresh failed:", error.message);
//   }
// };

// // Middleware to ensure cache is fresh
// const ensureFreshCache = async (req, res, next) => {
//   try {
//     await refreshCache();
//     next();
//   } catch (error) {
//     res.status(500).json({ message: "Error refreshing cache", error: error.message });
//   }
// };

// // Top Users API
// app.get("/users", ensureFreshCache, async (req, res) => {
//   try {
//     // Calculate post counts
//     const postCounts = {};
//     postsCache.forEach(post => {
//       postCounts[post.userId] = (postCounts[post.userId] || 0) + 1;
//     });

//     // Create user array with post counts
//     const usersWithCounts = Object.keys(usersCache).map(userId => ({
//       id: userId,
//       name: usersCache[userId],
//       postCount: postCounts[userId] || 0
//     }));

//     // Sort and get top 5
//     const topUsers = usersWithCounts
//       .sort((a, b) => b.postCount - a.postCount)
//       .slice(0, 5);

//     res.json(topUsers);
//   } catch (error) {
//     res.status(500).json({ message: "Error processing users", error: error.message });
//   }
// });

// // Posts API
// app.get("/posts", ensureFreshCache, async (req, res) => {
//   try {
//     const { type } = req.query;

//     if (!type || !["latest", "popular"].includes(type)) {
//       return res.status(400).json({ message: "Invalid type parameter. Use 'latest' or 'popular'." });
//     }

//     let resultPosts = [];

//     if (type === "popular") {
//       // Find max comments count
//       const maxComments = Math.max(...postsCache.map(post => post.comments?.length || 0));
//       // Filter posts with max comments
//       resultPosts = postsCache.filter(post => (post.comments?.length || 0) === maxComments);
//     } else { // latest
//       // Sort by createdAt (newest first) and take top 5
//       resultPosts = [...postsCache]
//         .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//         .slice(0, 5);
//     }

//     res.json(resultPosts);
//   } catch (error) {
//     res.status(500).json({ message: "Error processing posts", error: error.message });
//   }
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
//   // Initial cache refresh
//   refreshCache().then(() => console.log("Initial cache loaded"));
// });



// Update your refreshCache function to handle auth errors better
// const refreshCache = async () => {
//     try {
//       const now = Date.now();
//       if (lastUpdated && now - lastUpdated < CACHE_TTL) return;
  
//       const headers = {
//         "Content-Type": "application/json",
//         "Authorization": `${process.env.TOKEN_TYPE} ${process.env.ACCESS_TOKEN}`
//       };
  
//       // Verify your tokens are actually set
//       if (!process.env.ACCESS_TOKEN || !process.env.TOKEN_TYPE) {
//         throw new Error("Missing authentication tokens in .env");
//       }
  
//       const [usersResponse, postsResponse] = await Promise.all([
//         axios.get(`${BASE_URL}/users`, { headers }),
//         axios.get(`${BASE_URL}/posts`, { headers })
//       ]);
  
//       usersCache = {};
//       usersResponse.data.forEach(user => {
//         usersCache[user.id] = user.name;
//       });
  
//       postsCache = postsResponse.data;
//       lastUpdated = now;
//     } catch (error) {
//       console.error("Cache refresh failed:", error.response?.data || error.message);
//       throw error; // Rethrow to ensure middleware catches it
//     }
//   };



