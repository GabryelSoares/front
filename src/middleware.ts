import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    console.log('middleware!!!');
    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/sign-in',
    },
    callbacks: {
      authorized: ({ token }) => !!token,
    }
  }
);

export const config = { matcher: ['/vehicles', '/establishments', '/parking-registers' ] };


// export async function middleware(request: NextRequest) {
//   const session = await getServerSession();
//   const { pathname } = request.nextUrl

//   if(!isPublicRoute(pathname)) {
//     console.log('is private route');
//     if(session?.user?.email) {
//       console.log('is private route and logged in:: ', request.url);
//       return NextResponse.next();
//     }
//     console.log('is private route and not logged in:: ', request.url);
//     return NextResponse.redirect(new URL('/sign-in', request.url));
//   }
//   console.log('is public route:: ', request.url);
//   return NextResponse.next();
// }

