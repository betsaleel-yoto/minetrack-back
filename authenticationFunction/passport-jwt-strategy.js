const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'zehfgueurfyerfieuyfui';

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            let user;
            if (jwt_payload.matriculationNumber) {
                //  d'abord un super administrateur
                user = await prisma.SuperAdmin.findUnique({
                    where: {
                      matriculationNumber: jwt_payload.matriculationNumber
                    }
                });
                if (!user) {
                    // Si le super administrateur n'est pas trouvé, recherche un utilisateur ordinaire
                    user = await prisma.User.findUnique({
                        where: {
                          matriculationNumber: jwt_payload.matriculationNumber
                        }
                    });
                }
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    }));
};
