# Koala42 Assessment - Frontend - Connection with Backend

### Description
1) In this project I'm using NextJS and Tailwind CSS
2) I'm using TypeScript and types are in /app/types.ts
3) There is an api request to my Backend project in /app/api/getData.ts
4) Also there is a function in /app/utils/getType.ts for getting a type of element
5) Main code is in app/components/HierarchyTable.tsx and in page.tsx

### Installation
Clone the repository and install the dependencies:

```bash
git clone --branch connect-fe-and-be https://github.com/DanilaAnikin/koala42-assessment-frontend.git
cd koala42-assessment-frontend
npm install
```
You will need to clone and start my BE repository too
```bash
git clone https://github.com/DanilaAnikin/koala42-assessment-hiring.git
npm install
```

### Running:
Frontend:
```bash
npm run dev
```

Backend:
Add your DATABASE_URL and PORT (8000 is the best option) to .env file
```bash
npm run start:dev
```

### Issues and posible improvements
#### Responsive styles
I could add styles so the table is responsive and looks good either on mobile.

#### Split code into multiple components
If the project was bigger, I would separate the HierarchyTable and HierarchyRow components so it looks better and is easier to read.

#### Connecting with BE
Of course I could connect this code with my BE, already created code ( at github.com/DanilaAnikin/koala42-assessment-hiring/ )

#### Separate functions
I could also move functions away from .tsx files to one .ts file and importing them from there.

#### Types of items
I could maybe update the BE code instead of FE, so the Backend return right the same data types as FE needs on main branch, so I don't have to "retyping" the items.

#### Style and design
If I spend more time on that, I could manage the design and correct my styles so it looks better. 
In the assessment was that I don't have to spend much time on that, so I didn't.
# koala-fe-react-updated
# koala-fe-react-updated
