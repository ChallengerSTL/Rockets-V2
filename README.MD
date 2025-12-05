# Rocket Revamp - Budget App
Built with [Next JS](https://nextjs.org/docs) with [Chakra UI](https://chakra-ui.com/docs/components) and [MongoDB](https://www.mongodb.com/docs/manual/core/databases-and-collections/). Deployed to [Vercel](https://nextjs.org/learn/basics/deploying-nextjs-app/deploy).
> Click on the links above to learn more about each tool (linked to useful & relevant documentations). 
 
## Getting started
1. Follow [this guide](https://radixweb.com/blog/installing-npm-and-nodejs-on-windows-and-mac) to install `npm`
2. Navigate to cloned project and run `npm install` to install the required dependencies
3. Start in development mode: `npm run dev` 

## Database notes
* The project is configured to get the connection link to a MongoDB cluster from an environmental variable. On Vercel, this was already set. Locally, however, you need to create a file in the root of the project folder named `.env.local` which contains a row `MONGO_URI=<connection_link_to_your_mongodb_cluster>` (Contact Erin for this link and the password of the cluster)

* The current MongoDB cluster has 2 collections:
	1. `items`: containing details of each item including name,  price, image link, note, 
![items collection](https://i.ibb.co/4ms3Lsy/items.png)
	3. `code`: containing a single document 
		```
	     {admin_code: <code_for_approval>}
		```
		![code collection](https://i.ibb.co/zQzLL3k/code.png)
		

## Dev notes
* All components of the websites (Cart, Budget Bar, Nav Bar, Item Card, Cart Item, etc.) can be found in `pages/components`
* [React Context](https://www.netlify.com/blog/2020/12/01/using-react-context-for-state-management-in-next.js/) was used and the 3 context provider files (for items in cart, approved items, and current total) can be found in `/context`
	> Cookies are set in each of the 3 context file with default time-to-live = 60*5 = 30 minutes 

