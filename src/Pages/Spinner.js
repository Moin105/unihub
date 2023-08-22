// // import { Spinner, Box } from "@chakra-ui/react";

// // const LoadingSpinner = () => (
// //   <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
// //     <Spinner
// //       thickness="4px"
// //       speed="0.65s"
// //       emptyColor="gray.200"
// //       color="blue.500"
// //       size="xl"
// //     />
// //   </Box>
// // );

// // export default LoadingSpinner;
// import { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { Spinner, Box } from '@chakra-ui/react';

// function Loading({ children }) {
//   const [loading, setLoading] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     setLoading(true);
//     setTimeout(() => setLoading(false), 1000); // Timeout for demo purposes
//   }, [location.pathname]);

//   return (
//     <>
//       {loading ? (
//         <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//           <Spinner thickness="4px" speed="0.65s" emptyColor="#7BB564" color="white" size="xl" />
//         </Box>
//       ) : (
//         children
//       )}
//     </>
//   );
// }

// export default Loading;
