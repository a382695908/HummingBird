// Autogenerated by gameplay-luagen
#include "Base.h"
#include "ScriptController.h"
#include "lua_PhysicsSocketConstraint.h"
#include "Base.h"
#include "Game.h"
#include "Node.h"
#include "PhysicsConstraint.h"
#include "PhysicsRigidBody.h"
#include "PhysicsSocketConstraint.h"

namespace egret
{

void luaRegister_PhysicsSocketConstraint()
{
    const luaL_Reg lua_members[] = 
    {
        {"getBreakingImpulse", lua_PhysicsSocketConstraint_getBreakingImpulse},
        {"isEnabled", lua_PhysicsSocketConstraint_isEnabled},
        {"setBreakingImpulse", lua_PhysicsSocketConstraint_setBreakingImpulse},
        {"setEnabled", lua_PhysicsSocketConstraint_setEnabled},
        {NULL, NULL}
    };
    const luaL_Reg lua_statics[] = 
    {
        {"centerOfMassMidpoint", lua_PhysicsSocketConstraint_static_centerOfMassMidpoint},
        {"getRotationOffset", lua_PhysicsSocketConstraint_static_getRotationOffset},
        {"getTranslationOffset", lua_PhysicsSocketConstraint_static_getTranslationOffset},
        {NULL, NULL}
    };
    std::vector<std::string> scopePath;

    egret::ScriptUtil::registerClass("PhysicsSocketConstraint", lua_members, NULL, NULL, lua_statics, scopePath);
}

static PhysicsSocketConstraint* getInstance(lua_State* state)
{
    void* userdata = luaL_checkudata(state, 1, "PhysicsSocketConstraint");
    luaL_argcheck(state, userdata != NULL, 1, "'PhysicsSocketConstraint' expected.");
    return (PhysicsSocketConstraint*)((egret::ScriptUtil::LuaObject*)userdata)->instance;
}

int lua_PhysicsSocketConstraint_getBreakingImpulse(lua_State* state)
{
    // Get the number of parameters.
    int paramCount = lua_gettop(state);

    // Attempt to match the parameters to a valid binding.
    switch (paramCount)
    {
        case 1:
        {
            if ((lua_type(state, 1) == LUA_TUSERDATA))
            {
                PhysicsSocketConstraint* instance = getInstance(state);
                float result = instance->getBreakingImpulse();

                // Push the return value onto the stack.
                lua_pushnumber(state, result);

                return 1;
            }

            lua_pushstring(state, "lua_PhysicsSocketConstraint_getBreakingImpulse - Failed to match the given parameters to a valid function signature.");
            lua_error(state);
            break;
        }
        default:
        {
            lua_pushstring(state, "Invalid number of parameters (expected 1).");
            lua_error(state);
            break;
        }
    }
    return 0;
}

int lua_PhysicsSocketConstraint_isEnabled(lua_State* state)
{
    // Get the number of parameters.
    int paramCount = lua_gettop(state);

    // Attempt to match the parameters to a valid binding.
    switch (paramCount)
    {
        case 1:
        {
            if ((lua_type(state, 1) == LUA_TUSERDATA))
            {
                PhysicsSocketConstraint* instance = getInstance(state);
                bool result = instance->isEnabled();

                // Push the return value onto the stack.
                lua_pushboolean(state, result);

                return 1;
            }

            lua_pushstring(state, "lua_PhysicsSocketConstraint_isEnabled - Failed to match the given parameters to a valid function signature.");
            lua_error(state);
            break;
        }
        default:
        {
            lua_pushstring(state, "Invalid number of parameters (expected 1).");
            lua_error(state);
            break;
        }
    }
    return 0;
}

int lua_PhysicsSocketConstraint_setBreakingImpulse(lua_State* state)
{
    // Get the number of parameters.
    int paramCount = lua_gettop(state);

    // Attempt to match the parameters to a valid binding.
    switch (paramCount)
    {
        case 2:
        {
            if ((lua_type(state, 1) == LUA_TUSERDATA) &&
                lua_type(state, 2) == LUA_TNUMBER)
            {
                // Get parameter 1 off the stack.
                float param1 = (float)luaL_checknumber(state, 2);

                PhysicsSocketConstraint* instance = getInstance(state);
                instance->setBreakingImpulse(param1);
                
                return 0;
            }

            lua_pushstring(state, "lua_PhysicsSocketConstraint_setBreakingImpulse - Failed to match the given parameters to a valid function signature.");
            lua_error(state);
            break;
        }
        default:
        {
            lua_pushstring(state, "Invalid number of parameters (expected 2).");
            lua_error(state);
            break;
        }
    }
    return 0;
}

int lua_PhysicsSocketConstraint_setEnabled(lua_State* state)
{
    // Get the number of parameters.
    int paramCount = lua_gettop(state);

    // Attempt to match the parameters to a valid binding.
    switch (paramCount)
    {
        case 2:
        {
            if ((lua_type(state, 1) == LUA_TUSERDATA) &&
                lua_type(state, 2) == LUA_TBOOLEAN)
            {
                // Get parameter 1 off the stack.
                bool param1 = egret::ScriptUtil::luaCheckBool(state, 2);

                PhysicsSocketConstraint* instance = getInstance(state);
                instance->setEnabled(param1);
                
                return 0;
            }

            lua_pushstring(state, "lua_PhysicsSocketConstraint_setEnabled - Failed to match the given parameters to a valid function signature.");
            lua_error(state);
            break;
        }
        default:
        {
            lua_pushstring(state, "Invalid number of parameters (expected 2).");
            lua_error(state);
            break;
        }
    }
    return 0;
}

int lua_PhysicsSocketConstraint_static_centerOfMassMidpoint(lua_State* state)
{
    // Get the number of parameters.
    int paramCount = lua_gettop(state);

    // Attempt to match the parameters to a valid binding.
    switch (paramCount)
    {
        case 2:
        {
            if ((lua_type(state, 1) == LUA_TUSERDATA || lua_type(state, 1) == LUA_TTABLE || lua_type(state, 1) == LUA_TNIL) &&
                (lua_type(state, 2) == LUA_TUSERDATA || lua_type(state, 2) == LUA_TTABLE || lua_type(state, 2) == LUA_TNIL))
            {
                // Get parameter 1 off the stack.
                bool param1Valid;
                egret::ScriptUtil::LuaArray<Node> param1 = egret::ScriptUtil::getObjectPointer<Node>(1, "Node", false, &param1Valid);
                if (!param1Valid)
                {
                    lua_pushstring(state, "Failed to convert parameter 1 to type 'Node'.");
                    lua_error(state);
                }

                // Get parameter 2 off the stack.
                bool param2Valid;
                egret::ScriptUtil::LuaArray<Node> param2 = egret::ScriptUtil::getObjectPointer<Node>(2, "Node", false, &param2Valid);
                if (!param2Valid)
                {
                    lua_pushstring(state, "Failed to convert parameter 2 to type 'Node'.");
                    lua_error(state);
                }

                //void* returnPtr = (void*)new Vector3(PhysicsSocketConstraint::centerOfMassMidpoint(param1, param2));
				kmVec3* returnPtr = new kmVec3;
				kmVec3 temp = PhysicsSocketConstraint::centerOfMassMidpoint(param1, param2);
				memcpy(returnPtr, &temp, sizeof(float) * 3);
                if (returnPtr)
                {
                    egret::ScriptUtil::LuaObject* object = (egret::ScriptUtil::LuaObject*)lua_newuserdata(state, sizeof(egret::ScriptUtil::LuaObject));
                    object->instance = returnPtr;
                    object->owns = true;
                    luaL_getmetatable(state, "kmVec3");
                    lua_setmetatable(state, -2);
                }
                else
                {
                    lua_pushnil(state);
                }

                return 1;
            }

            lua_pushstring(state, "lua_PhysicsSocketConstraint_static_centerOfMassMidpoint - Failed to match the given parameters to a valid function signature.");
            lua_error(state);
            break;
        }
        default:
        {
            lua_pushstring(state, "Invalid number of parameters (expected 2).");
            lua_error(state);
            break;
        }
    }
    return 0;
}

int lua_PhysicsSocketConstraint_static_getRotationOffset(lua_State* state)
{
    // Get the number of parameters.
    int paramCount = lua_gettop(state);

    // Attempt to match the parameters to a valid binding.
    switch (paramCount)
    {
        case 2:
        {
            if ((lua_type(state, 1) == LUA_TUSERDATA || lua_type(state, 1) == LUA_TTABLE || lua_type(state, 1) == LUA_TNIL) &&
                (lua_type(state, 2) == LUA_TUSERDATA || lua_type(state, 2) == LUA_TNIL))
            {
                // Get parameter 1 off the stack.
                bool param1Valid;
                egret::ScriptUtil::LuaArray<Node> param1 = egret::ScriptUtil::getObjectPointer<Node>(1, "Node", false, &param1Valid);
                if (!param1Valid)
                {
                    lua_pushstring(state, "Failed to convert parameter 1 to type 'Node'.");
                    lua_error(state);
                }

                // Get parameter 2 off the stack.
                bool param2Valid;
                egret::ScriptUtil::LuaArray<kmVec3> param2 = egret::ScriptUtil::getObjectPointer<kmVec3>(2, "kmVec3", true, &param2Valid);
                if (!param2Valid)
                {
                    lua_pushstring(state, "Failed to convert parameter 2 to type 'kmVec3'.");
                    lua_error(state);
                }

                //void* returnPtr = (void*)new Quaternion(PhysicsSocketConstraint::getRotationOffset(param1, *param2));
				kmQuaternion* returnPtr = new kmQuaternion;
				kmQuaternion temp;
				memcpy(returnPtr, &temp, sizeof(float) * 4);
                if (returnPtr)
                {
                    egret::ScriptUtil::LuaObject* object = (egret::ScriptUtil::LuaObject*)lua_newuserdata(state, sizeof(egret::ScriptUtil::LuaObject));
                    object->instance = returnPtr;
                    object->owns = true;
                    luaL_getmetatable(state, "Quaternion");
                    lua_setmetatable(state, -2);
                }
                else
                {
                    lua_pushnil(state);
                }

                return 1;
            }

            lua_pushstring(state, "lua_PhysicsSocketConstraint_static_getRotationOffset - Failed to match the given parameters to a valid function signature.");
            lua_error(state);
            break;
        }
        default:
        {
            lua_pushstring(state, "Invalid number of parameters (expected 2).");
            lua_error(state);
            break;
        }
    }
    return 0;
}

int lua_PhysicsSocketConstraint_static_getTranslationOffset(lua_State* state)
{
    // Get the number of parameters.
    int paramCount = lua_gettop(state);

    // Attempt to match the parameters to a valid binding.
    switch (paramCount)
    {
        case 2:
        {
            if ((lua_type(state, 1) == LUA_TUSERDATA || lua_type(state, 1) == LUA_TTABLE || lua_type(state, 1) == LUA_TNIL) &&
                (lua_type(state, 2) == LUA_TUSERDATA || lua_type(state, 2) == LUA_TNIL))
            {
                // Get parameter 1 off the stack.
                bool param1Valid;
                egret::ScriptUtil::LuaArray<Node> param1 = egret::ScriptUtil::getObjectPointer<Node>(1, "Node", false, &param1Valid);
                if (!param1Valid)
                {
                    lua_pushstring(state, "Failed to convert parameter 1 to type 'Node'.");
                    lua_error(state);
                }

                // Get parameter 2 off the stack.
                bool param2Valid;
                egret::ScriptUtil::LuaArray<kmVec3> param2 = egret::ScriptUtil::getObjectPointer<kmVec3>(2, "kmVec3", true, &param2Valid);
                if (!param2Valid)
                {
                    lua_pushstring(state, "Failed to convert parameter 2 to type 'kmVec3'.");
                    lua_error(state);
                }

                //void* returnPtr = (void*)new Vector3(PhysicsSocketConstraint::getTranslationOffset(param1, *param2));
				kmVec3* returnPtr = new kmVec3;
				kmVec3 temp = PhysicsSocketConstraint::getTranslationOffset(param1, *param2);
				memcpy(returnPtr, &temp, sizeof(float) * 3);
                if (returnPtr)
                {
                    egret::ScriptUtil::LuaObject* object = (egret::ScriptUtil::LuaObject*)lua_newuserdata(state, sizeof(egret::ScriptUtil::LuaObject));
                    object->instance = returnPtr;
                    object->owns = true;
                    luaL_getmetatable(state, "kmVec3");
                    lua_setmetatable(state, -2);
                }
                else
                {
                    lua_pushnil(state);
                }

                return 1;
            }

            lua_pushstring(state, "lua_PhysicsSocketConstraint_static_getTranslationOffset - Failed to match the given parameters to a valid function signature.");
            lua_error(state);
            break;
        }
        default:
        {
            lua_pushstring(state, "Invalid number of parameters (expected 2).");
            lua_error(state);
            break;
        }
    }
    return 0;
}

}
