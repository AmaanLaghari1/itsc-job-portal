import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchRole } from '../actions/AuthAction';

const RoleSwitcher = () => {
  const dispatch = useDispatch();

  // Roles from auth state
  const userRoles = useSelector((state) => state.auth.authData?.user_roles || []);

  // Selected role from Redux
  const selectedRole = useSelector((state) => state.roles.selectedRole);

  // Role precedence (lower number = higher priority)
  const rolePrecedence = {
    'Super Admin': 1,
    'Admin': 2,
    'Operator': 3,
    'Primary': 4,
  };

  useEffect(() => {
    if (!selectedRole && userRoles.length > 0) {
      let highestRole;

      if (userRoles.length === 1) {
        // Only one role → set it directly
        highestRole = userRoles[0];
      } else {
        // Multiple roles → pick highest precedence
        const sortedRoles = [...userRoles].sort((a, b) => {
          const aPrecedence = rolePrecedence[a.role.ROLE_NAME] || Infinity;
          const bPrecedence = rolePrecedence[b.role.ROLE_NAME] || Infinity;
          return aPrecedence - bPrecedence;
        });
        highestRole = sortedRoles[0];
      }

      if (highestRole) {
        dispatch(switchRole(highestRole.role.ROLE_ID));
      }
    }
  }, [dispatch, selectedRole, userRoles]);

  const handleChange = (e) => {
    dispatch(switchRole(Number(e.target.value)));
  };

  // If user has only one role → don't render dropdown
  if (userRoles.length <= 1) {
    return null;
  }

  return (
    <div className="small px-3 p-1">
      <label htmlFor="role" className="form-label fw-bolder text-primary mb-0">
        Switch Role
      </label>
      <select
        name="role"
        id="role"
        className="form-control form-control-sm bg-primary text-light border-0 mt-0 w-75 form-select"
        value={selectedRole || ''}
        onChange={handleChange}
      >
        {userRoles.map((role) => (
          <option key={role.ROLE_ID} value={role.ROLE_ID}>
            {role?.role.ROLE_NAME??''}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoleSwitcher;
