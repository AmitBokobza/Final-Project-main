import { FunctionComponent } from "react";

interface UserManagerHeaderProps {
    theme:string;
}
 
const UserManagerHeader: FunctionComponent<UserManagerHeaderProps> = ({theme}) => {
    
    return ( 
        <div className="relative py-12 px-4 md:px-6">

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-10">
          <div 
            className="absolute top-1/4 -left-1/4 w-full h-96 rounded-full gradient-background"
            style={{ 
              filter: 'blur(120px)',
              transform: 'rotate(-15deg)'
            }}
          />
          <div 
            className="absolute bottom-1/4 -right-1/4 w-full h-96 rounded-full gradient-background"
            style={{ 
              filter: 'blur(120px)',
              transform: 'rotate(15deg)'
            }}
          />
        </div>
  
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 
            className={`
              text-4xl md:text-5xl font-bold mb-4 
              ${theme === 'dark' ? 'text-white' : 'text-gray-900'}
              relative inline-block
            `}
          >
            User Management
          </h1>
          <p 
            className={`
              text-lg max-w-xl mx-auto 
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}
            `}
          >
            Manage and overview all users in your system
          </p>
        </div>
      </div>
     );
}
 
export default UserManagerHeader;