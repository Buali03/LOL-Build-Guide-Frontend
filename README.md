<h1>Project 4: Hex Craft</h1>
<h2>Getting Started</h2>
<p>
This project is a League of Legends build guide and info website where users can explore, champions, runes, spells, and items to create personalized build guides. It provides both browsing and editing features so players can learn from others while also sharing their own strategies.
</p>
<h2>Features</h2>
<ul>
<li>Browse all available champions with detailed images and information.</li>
<li>Create and edit custom build guides, including runes, spells, and items.</li>
<li>View guides made by other users to learn different playstyles.</li>
<li>Simple, responsive interface designed for quick navigation and clarity</li>
</ul>
<h2>Purpose</h2>
<p>
The goal of this website is to provide a community-driven hub for LoL players. Instead of relying only on external gudie platforms, users can easily manage and share their own builds, making it both a learning resource and a creative outlet.
</p>
</br>
<h2>Website Preview</h2>
<img src="sign-up.png">
<p>
<b>Login Page:</b> This page allows users to login to their account for the website.
</p>
<img src="PagePic.png">
<p>
<b>Champions Page:</b> This page includes a list of all champions to direct to their detailed pages.
</p>
<p>
<b>Champion Detail Page:</b> This page is directed from the champion list to show the specific champion info and guides.
</p>
<p>
<b>Create:</b> Users can create a build guide to add it to the page.
</p>
<p>
<b>Guides Page:</b> Users can view all build guides made in the website.
</p>
<p>
<b>Guide Detail Page:</b> Users can view the specific build guide full details.
<p>
<b>Logout:</b> Users log out of their currently logged in account.
</p>
</br>
<p>Please share your build guide and browse other users in <i><a href="">Hex Craft</a></i>!</p>

<h2>Attributions</h2>
<p><b>MongoDB</b></p>
<ul>
<li><a href="https://github.com/GA-SEB-8/JWT-Auth-Frontend">JWT Authentication</li>
<li><a href="https://github.com/GA-SEB-8/Unit02-Week02-Day01-Mongoose-Relationships">Mongoose Relationships</li>
</ul>

<p><b>CSS</b></p>
<ul>
<li><a href="https://www.w3schools.com/css/css_tooltip.asp">Tooltip</li>
</ul>

<h2>Technologies Used</h2>
<p>
<b>MongoDB:</b> Used to store user details and user-created build guides. Each guide document keeps track of the selected champion, runes, spells, and items chosen by the user, along with the guide title. Since static champion/rune/item data comes from an external API, MongoDB focuses only on persisting guides made within the website.
</p>
<p>
<b>Express.js:</b> Provides the backend API endpoints for creating, update, fetching and deleting build guides. Express handles the requests from the React frontend, processes the data, and interacts with MongoDB to save or retrieve guides.
</p>
<p>
<b>React:</b> Builds the interactive frontend where users can browse champions, view guide details, and create or update their own guides. React fetches static champion/rune/item data and images from the external API, while managing forms and keeping guide state synchronized with user inputs. 
</p>
<p>
<b>Node.js:</b> Runs the backend server, executing Express routes and managing communication between the frontend and MongoDB. Node.js ensures smooth integration between user actions on the website and the stored data, while also coordinating external API request.
</p>
<h2>Data Source (DDragon API)</h2>
<ul>
<li><b><a href="https://ddragon.leagueoflegends.com/api/versions.json">Game Version:</b> Used to get the latest patch version for all data</li>
<li><b><a href="https://ddragon.leagueoflegends.com/cdn/15.18.1/data/en_US/champion.json">Champions:</b> Provides champion information, including names, details, and images</li>
<li><b><a href="https://ddragon.leagueoflegends.com/cdn/15.18.1/data/en_US/runesReforged.json">Runes:</b> Contains all rune paths, icons, and descriptions</li>
<li><b><a href="https://ddragon.leagueoflegends.com/cdn/15.18.1/data/en_US/summoner.json">Summoner Spells:</b> Includes summoner spell names, descriptions, and images</li>
<li><b><a href="https://ddragon.leagueoflegends.com/cdn/15.18.1/data/en_US/item.json">Items:</b> Provides details and icons for all in-game items</li>
</ul>
<h2>Next Steps</h2>
<p>
Future enhancements could include creating more details in guide (Such as ability order or more rune options). Also, add items, spells, and runes information page, so users can see what each is best used for. Lastly, add a profile page that can be customized for each user including the guides that they created.
</p>
