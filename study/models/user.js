module.exports = function(sequelize, DataTypes) {
    return sequelize.define('User', {
        id: { type: DataTypes.BIGINT(11), autoIncrement: true, primaryKey: true, unique: true },
        username: { type: DataTypes.STRING, allowNull: false, comment: '用户名' },
        password: { type: DataTypes.STRING, allowNull: false, comment: '用户密码' },
        active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, comment: '是否正常状态' }
    }, {
        timestamps: true,
        underscored: true,
        // paranoid: true,//为true的时候，进行虚拟删除
        classMethods: {
            associate: function(models) {
                models.User.hasOne(models.UserCheckin);
                models.User.hasMany(models.UserAddress, {foreignKey:'user_id', targetKey:'id', as:'Address'});
                models.User.belongsToMany(models.Role, {through: 'user_roles', as:'UserRoles'});
            }
        },
        freezeTableName: true,
        tableName: 'user',
        charset: 'utf8',
        collate: 'utf8_general_ci'
    });
}
