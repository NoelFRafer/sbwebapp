/*
  # Create User Role RPC Functions

  1. Functions Created
    - `is_admin()` - Checks if the current user (or specified user) has admin role
    - `get_user_role()` - Returns the role of the current user (or specified user)

  2. Security
    - Both functions use SECURITY DEFINER to run with elevated privileges
    - Functions can check any user's role when user_uuid is provided
    - Default to current authenticated user when no parameter is provided

  3. Functionality
    - `is_admin` returns boolean true/false
    - `get_user_role` returns text role or 'user' as default
    - Both functions handle cases where user has no role entry
*/

-- Function to check if a user is an admin
CREATE OR REPLACE FUNCTION public.is_admin(user_uuid uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
BEGIN
  -- Return true if user has admin role, false otherwise
  RETURN EXISTS (
    SELECT 1 
    FROM public.user_roles 
    WHERE user_id = user_uuid AND role = 'admin'
  );
END;
$function$;

-- Function to get user role
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid uuid DEFAULT auth.uid())
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $function$
DECLARE
  user_role text;
BEGIN
  -- Get the user's role from user_roles table
  SELECT role INTO user_role 
  FROM public.user_roles 
  WHERE user_id = user_uuid 
  LIMIT 1;
  
  -- Return the role or 'user' as default if no role found
  RETURN COALESCE(user_role, 'user');
END;
$function$;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_user_role(uuid) TO authenticated;

-- Grant execute permissions for the default parameter versions
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;